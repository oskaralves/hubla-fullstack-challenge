'use client';

import { Button } from '@/components/ui/button';

import { FaFacebookF } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

export const Social = () => {
  return (
    <div className="flex w-full items-center gap-x-8">
      <Button
        size="lg"
        variant="outline"
        className="w-full border-input hover:border-red-600"
        onClick={() => {
          console.log('@todo: login or register with Google');
        }}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="fill-color-[#1877f2] w-full border-input hover:border-[#1877f2]"
        onClick={() => {
          console.log('@todo: login or register with Facebook');
        }}
      >
        <FaFacebookF className="h-5 w-5" color="#1877f2" />
      </Button>
    </div>
  );
};
