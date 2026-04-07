import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div class="px-6 md:px-16 lg:px-24 xl:px-32 cursor-pointer">
    <div class="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div>
            <img class="w-34 md:w-32" src={assets.logo} alt="dummyLogoColored" />
            <p class="max-w-[410px] mt-6">Your trusted car rental app for safe, affordable, and hassle-free travel.Book your ride anytime, anywhere with just a few clicks.</p>
        </div>
        <div class="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
            <div>
                <h3 class="font-semibold text-base text-gray-900 md:mb-5 mb-2">Quick Links</h3>
                <ul class="text-sm space-y-1">
                    <li><a href="#" class="hover:underline transition">Home</a></li>
                    <li><a href="#" class="hover:underline transition">Best Sellers</a></li>
                    <li><a href="#" class="hover:underline transition">Offers & Deals</a></li>
                    <li><a href="#" class="hover:underline transition">Contact Us</a></li>
                    <li><a href="#" class="hover:underline transition">FAQs</a></li>
                </ul>
            </div>
            <div>
                <h3 class="font-semibold text-base text-gray-900 md:mb-5 mb-2">Need Help?</h3>
                <ul class="text-sm space-y-1">
                    <li><a href="#" class="hover:underline transition">Delivery Information</a></li>
                    <li><a href="#" class="hover:underline transition">Return & Refund Policy</a></li>
                    <li><a href="#" class="hover:underline transition">Payment Methods</a></li>
                    <li><a href="#" class="hover:underline transition">Track your Order</a></li>
                    <li><a href="#" class="hover:underline transition">Contact Us</a></li>
                </ul>
            </div>
            <div>
                <h3 class="font-semibold text-base text-gray-900 md:mb-5 mb-2">Follow Us</h3>
                <ul class="text-sm space-y-1">
                    <li><a href="#" class="hover:underline transition">Instagram</a></li>
                    <li><a href="#" class="hover:underline transition">Twitter</a></li>
                    <li><a href="#" class="hover:underline transition">Facebook</a></li>
                    <li><a href="#" class="hover:underline transition">YouTube</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="flex flex-col md:flex-row gap-3 items-center justify-around w-full py-4 text-sm text-gray-500">
        <p>Copyright © 2025 PrebuiltUI. All rights reservered.</p>
        <div class="flex items-center gap-4">
            <a href="#" class="hover:text-gray-600 transition-all">
                Contact Us
            </a>
            <div class="h-8 w-px bg-white/20"></div>
            <a href="#" class="hover:text-gray-600 transition-all">
                Privacy Policy
            </a>
            <div class="h-8 w-px bg-white/20"></div>
            <a href="#" class="hover:text-gray-600 transition-all">
                Trademark Policy
            </a>
        </div>
    </div>
  </div>
  )
}

export default Footer
