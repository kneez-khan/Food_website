CREATE SEQUENCE public.order_number_seq START 1001;
GRANT USAGE ON SEQUENCE public.order_number_seq TO service_role;

CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text NOT NULL UNIQUE DEFAULT ('FF-' || nextval('public.order_number_seq')::text),
  idempotency_key uuid NOT NULL UNIQUE,
  customer_name text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  notes text,
  payment_method text NOT NULL DEFAULT 'cash_on_delivery',
  total numeric(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  item_id text NOT NULL,
  name text NOT NULL,
  unit_price numeric(10,2) NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  line_total numeric(10,2) NOT NULL
);
CREATE INDEX order_items_order_id_idx ON public.order_items(order_id);
GRANT ALL ON public.order_items TO service_role;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Atomic order creation: order + items in one transaction, idempotent on key.
CREATE OR REPLACE FUNCTION public.place_order(
  _key uuid, _name text, _phone text, _address text, _notes text, _total numeric, _items jsonb
) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _id uuid;
BEGIN
  SELECT id INTO _id FROM public.orders WHERE idempotency_key = _key;
  IF _id IS NOT NULL THEN RETURN _id; END IF;
  INSERT INTO public.orders (idempotency_key, customer_name, phone, address, notes, total)
  VALUES (_key, _name, _phone, _address, _notes, _total) RETURNING id INTO _id;
  INSERT INTO public.order_items (order_id, item_id, name, unit_price, quantity, line_total)
  SELECT _id, i->>'item_id', i->>'name', (i->>'unit_price')::numeric, (i->>'quantity')::int, (i->>'line_total')::numeric
  FROM jsonb_array_elements(_items) i;
  RETURN _id;
END $$;
REVOKE ALL ON FUNCTION public.place_order(uuid,text,text,text,text,numeric,jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.place_order(uuid,text,text,text,text,numeric,jsonb) TO service_role;