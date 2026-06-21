import { default as NextLink } from 'next/link';
import React, { memo } from 'react';
import Typography from '../typography/Typography';

const Link = ({ href, label }: { href: string; label: string }) => {
  return (
    <NextLink
      href={href}
      className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
    >
      <Typography variant={'body2'}>{label}</Typography>
    </NextLink>
  );
};

export default memo(Link);
