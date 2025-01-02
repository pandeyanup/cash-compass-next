import Link from "next/link";

const Footer = () => {
 
console.log("Neko");
  
    return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="/about" className="text-gray-400 hover:text-gray-500">
            About
          </Link>
          <Link href="/privacy" className="text-gray-400 hover:text-gray-500">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-gray-400 hover:text-gray-500">
            Terms of Service
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} Cash. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
