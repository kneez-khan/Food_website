UPDATE public.orders SET status = 'new' WHERE status NOT IN ('new','preparing','out_for_delivery','delivered','cancelled');
ALTER TABLE public.orders ALTER COLUMN status SET DEFAULT 'new';
ALTER TABLE public.orders ADD CONSTRAINT orders_status_check CHECK (status IN ('new','preparing','out_for_delivery','delivered','cancelled'));
GRANT UPDATE (status) ON public.orders TO authenticated;
CREATE POLICY "Admins update order status" ON public.orders FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));