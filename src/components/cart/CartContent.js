'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2, X, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/pricing';
import { buildOrderMessage, openWhatsAppMessage } from '@/lib/whatsapp';

export default function CartContent() {
  const { items, count, hydrated, changeQuantity, removeItem } = useCart();
  const [feedback, setFeedback] = useState('');
  const [orderFormOpen, setOrderFormOpen] = useState(false);
  const lines = items.map((item) => {
    const product = item.product;
    if (!product) return null;
    const variant = item.variant || product.variants?.find((option) => option.id === item.variantId);
    const price = Number(item.price ?? variant?.salePrice ?? product.salePrice ?? 0);
    const variantLabel = item.variantLabel || variant?.label || product.variantLabel || '';
    return { ...item, product, variant, price, variantLabel };
  }).filter(Boolean);
  const subtotal = lines.reduce((total, line) => total + line.price * line.quantity, 0);

  function openOrderForm() {
    if (!lines.length) return;
    setFeedback('');
    setOrderFormOpen(true);
  }

  useEffect(() => {
    if (!orderFormOpen) return undefined;
    function closeOnEscape(event) {
      if (event.key === 'Escape') setOrderFormOpen(false);
    }
    document.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = '';
    };
  }, [orderFormOpen]);

  function submitOrder(event) {
    event.preventDefault();
    const fields = Object.fromEntries(new FormData(event.currentTarget).entries());
    const result = openWhatsAppMessage(buildOrderMessage(lines, subtotal, fields));
    if (result === 'opened') setFeedback('WhatsApp has opened with your order summary. Review the details and press Send to complete your enquiry.');
    else if (result === 'blocked') setFeedback('Your browser blocked the WhatsApp tab. Allow pop-ups to continue. Your cart is saved and the order has not been sent.');
    else setFeedback('WhatsApp contact is not configured yet. Your cart is saved and your order has not been sent.');
    if (result === 'opened') setOrderFormOpen(false);
  }

  if (!hydrated) return <div className="cart-loading" aria-live="polite">Loading your saved cart…</div>;

  if (!lines.length) return (
    <div className="cart-empty"><span><ShoppingBag size={25} /></span><p className="eyebrow">A little room for something good</p><h2>Your cart is waiting.</h2><p>Browse the collection and add a few pantry favourites to get started.</p><Link className="button button--navy" href="/products">Browse products <ArrowLeft size={16} /></Link></div>
  );

  return (
    <>
      <div className="cart-layout">
      <div className="cart-items">
        <div className="cart-list-heading"><span>Your selection</span><span>{count} {count === 1 ? 'item' : 'items'}</span></div>
        {lines.map((line) => <article className="cart-item" key={`${line.productId}-${line.variantId}`}>
          <div className="cart-item__image"><Image src={line.product.image} alt={line.product.imageAlt || line.product.name} fill sizes="120px" /></div>
          <div className="cart-item__details"><p className="eyebrow">{line.product.type === 'combo' ? 'Curated combo' : 'Pantry selection'}</p><h2>{line.product.name}</h2>{line.variantLabel && <span>{line.variantLabel}</span>}<button className="cart-remove" type="button" onClick={() => removeItem(line.productId, line.variantId)}><Trash2 size={14} />Remove</button></div>
          <div className="cart-item__controls"><span className="cart-item__price">{formatCurrency(line.price)}</span><div className="quantity-control"><button type="button" aria-label={`Decrease quantity of ${line.product.name}`} onClick={() => changeQuantity(line.productId, line.variantId, -1)}><Minus size={14} /></button><span>{line.quantity}</span><button type="button" aria-label={`Increase quantity of ${line.product.name}`} onClick={() => changeQuantity(line.productId, line.variantId, 1)}><Plus size={14} /></button></div></div>
          <strong className="cart-item__subtotal">{formatCurrency(line.price * line.quantity)}</strong>
        </article>)}
        <Link className="cart-continue" href="/products"><ArrowLeft size={15} /> Continue browsing</Link>
      </div>
      <aside className="cart-summary"><p className="eyebrow">Order overview</p><h2>Subtotal</h2><div className="cart-summary__line"><span>{count} {count === 1 ? 'item' : 'items'}</span><strong>{formatCurrency(subtotal)}</strong></div><div className="cart-summary__total"><span>Cart subtotal</span><strong>{formatCurrency(subtotal)}</strong></div><p className="cart-summary__note">Shipping and other charges are not included and can be discussed when your order is confirmed.</p><button className="button button--orange button--checkout" type="button" onClick={openOrderForm}>Order via WhatsApp <ArrowLeft size={16} /></button><p className="cart-summary__secure">Your cart stays saved until you choose to change it.</p>{feedback && <p className="form-feedback form-feedback--error" role="status">{feedback}</p>}</aside>
      </div>
      {orderFormOpen && <div className="order-modal" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOrderFormOpen(false); }}>
      <div className="order-modal__panel" role="dialog" aria-modal="true" aria-labelledby="order-modal-title">
        <button className="order-modal__close" type="button" aria-label="Close order form" onClick={() => setOrderFormOpen(false)}><X size={20} /></button>
        <p className="eyebrow">Complete your order</p>
        <h2 id="order-modal-title">Send your enquiry</h2>
        <p className="order-modal__intro">Enter your details and we’ll prepare your cart summary for WhatsApp.</p>
        <form className="order-modal__form" onSubmit={submitOrder}>
          <label className="order-modal__field"><span>Your name <b>*</b></span><input name="name" autoComplete="name" placeholder="Enter your full name" required /></label>
          <label className="order-modal__field"><span>Phone number <b>*</b></span><input name="phone" type="tel" autoComplete="tel" inputMode="tel" pattern="[0-9+() .-]{7,18}" placeholder="Enter your phone number" required /></label>
          <label className="order-modal__field"><span>Delivery address <b>*</b></span><textarea name="address" rows="3" autoComplete="street-address" placeholder="Enter your full delivery address" required /></label>
          <label className="order-modal__field"><span>PIN code <b>*</b></span><input name="pin" inputMode="numeric" pattern="[0-9]{6}" maxLength="6" placeholder="Enter your 6-digit PIN code" required /></label>
          <div className="order-modal__actions"><button className="button order-modal__cancel" type="button" onClick={() => setOrderFormOpen(false)}>Cancel</button><button className="button button--orange" type="submit"><Send size={16} /> Send order</button></div>
        </form>
      </div>
      </div>}
    </>
  );
}
