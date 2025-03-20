import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 1,
    name: 'สมาร์ทโฟน รุ่น X',
    price: 12990,
    image: '/products/smartphone.jpg',
    description: 'สมาร์ทโฟนรุ่นล่าสุดพร้อมกล้องคุณภาพสูงและแบตเตอรี่ที่ใช้งานได้ยาวนาน'
  },
  {
    id: 2,
    name: 'แล็ปท็อป รุ่น Pro',
    price: 32990,
    image: '/products/laptop.jpg',
    description: 'แล็ปท็อปประสิทธิภาพสูงสำหรับทำงานและความบันเทิง'
  },
  {
    id: 3,
    name: 'หูฟังไร้สาย',
    price: 2990,
    image: '/products/headphones.jpg',
    description: 'หูฟังไร้สายคุณภาพเสียงระดับพรีเมียม'
  },
  {
    id: 4,
    name: 'นาฬิกาอัจฉริยะ',
    price: 5990,
    image: '/products/smartwatch.jpg',
    description: 'นาฬิกาอัจฉริยะติดตามสุขภาพและการออกกำลังกาย'
  },
  {
    id: 5,
    name: 'กล้องถ่ายรูป DSLR',
    price: 24990,
    image: '/products/camera.jpg',
    description: 'กล้องถ่ายรูป DSLR คุณภาพสูงสำหรับมืออาชีพ'
  },
  {
    id: 6,
    name: 'ลำโพงบลูทูธ',
    price: 1990,
    image: '/products/speaker.jpg',
    description: 'ลำโพงบลูทูธพกพาเสียงดังกังวาน'
  }
];
