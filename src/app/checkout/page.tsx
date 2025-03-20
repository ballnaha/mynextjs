'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, totalItems, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.items.length === 0) {
      alert('ตะกร้าสินค้าของคุณว่างเปล่า');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderComplete(true);
      clearCart();
      
      // Redirect to success page after 2 seconds
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }, 1500);
  };

  if (orderComplete) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-green-100 dark:bg-green-900 p-8 rounded-lg">
          <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">การสั่งซื้อเสร็จสมบูรณ์!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">ขอบคุณสำหรับการสั่งซื้อ เราจะจัดส่งสินค้าให้คุณโดยเร็วที่สุด</p>
          <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
            กลับไปหน้าหลัก
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            กลับไปหน้าหลัก
          </Link>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">ชำระเงิน</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">สรุปรายการสั่งซื้อ</h2>
            
            {cart.items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400 mb-4">ตะกร้าสินค้าของคุณว่างเปล่า</p>
                <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  กลับไปเลือกสินค้า
                </Link>
              </div>
            ) : (
              <>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cart.items.map((item) => (
                    <div key={item.product.id} className="py-4 flex items-center">
                      <div className="relative h-16 w-16 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                        {item.product.image.startsWith('/') ? (
                          <div className="flex items-center justify-center h-full">
                            <span className="text-xs text-gray-400">{item.product.name}</span>
                          </div>
                        ) : (
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      
                      <div className="ml-4 flex-grow">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">{item.product.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.quantity} x ฿{item.product.price.toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          ฿{(item.product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">จำนวนสินค้า</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{totalItems} ชิ้น</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base font-medium text-gray-900 dark:text-white">ยอดรวมทั้งสิ้น</span>
                    <span className="text-base font-medium text-gray-900 dark:text-white">฿{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Checkout Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">ข้อมูลการจัดส่ง</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  ชื่อ-นามสกุล
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  อีเมล
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  เบอร์โทรศัพท์
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  ที่อยู่
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    เมือง/อำเภอ
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    รหัสไปรษณีย์
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting || cart.items.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'กำลังดำเนินการ...' : 'ยืนยันการสั่งซื้อ'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
