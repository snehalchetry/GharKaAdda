import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">GharKaAdda</h3>
            <p className="text-gray-300 text-sm">
              Find Your Perfect Student Stay — Verified, Affordable, No Brokers
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/listings" className="hover:text-accent transition-colors">
                  Browse Listings
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-accent transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Students</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/auth/signup?role=student" className="hover:text-accent transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/listings" className="hover:text-accent transition-colors">
                  Find PG
                </Link>
              </li>
              <li>
                <Link href="/dashboard/student" className="hover:text-accent transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Owners</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/auth/signup?role=owner" className="hover:text-accent transition-colors">
                  List Your PG
                </Link>
              </li>
              <li>
                <Link href="/dashboard/owner" className="hover:text-accent transition-colors">
                  Owner Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <a href="mailto:support@gharkaddda.com" className="flex items-center space-x-2 text-gray-300 hover:text-accent transition-colors">
              <Mail className="h-4 w-4" />
              <span className="text-sm">support@gharkaddda.com</span>
            </a>
            <a href="tel:+911234567890" className="flex items-center space-x-2 text-gray-300 hover:text-accent transition-colors">
              <Phone className="h-4 w-4" />
              <span className="text-sm">+91 123 456 7890</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-300 hover:text-accent transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-300 hover:text-accent transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-300 hover:text-accent transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 GharKaAdda. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

