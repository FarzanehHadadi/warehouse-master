import Typography from '@/components/ui/typography/Typography';
import React from 'react';

const TitleComponent = ({ Icon, Title }) => {
  return (
    <Typography variant="body" className="mb-3  flex items-center gap-2">
      <Icon className="size-5" />
      {Title}
    </Typography>
  );
};

export default TitleComponent;
