'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

// Base Root (with RTL)
const Tabs = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>) => (
  <TabsPrimitive.Root
    dir="rtl" // ✅ keep RTL direction
    {...props}
    className={cn('w-full', className)}
  />
);

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'relative inline-flex w-full h-10 items-stretch justify-between rounded-lg bg-gradient-to-r from-brand-50 via-brand-100 to-brand-50 dark:bg-brand-900 border border-brand-200 dark:border-brand-900 p-0 px-1 text-brand-800 dark:text-brand-100',
      className
    )}
    {...props}
  >
    {children}
  </TabsPrimitive.List>
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      `
      relative z-10 flex-1 flex justify-center items-center
      px-3 py-2 m-1 text-sm font-medium rounded-lg
      text-center transition-colors duration-300
      text-gray-800 dark:text-gray-100
      data-[state=active]:text-white
      `,
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

interface EnhancedTabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  className?: string;
}

const EnhancedTabs: React.FC<EnhancedTabsProps> & {
  List: typeof TabsList;
  Trigger: typeof TabsTrigger;
  Content: typeof TabsContent;
} = ({ className, children, ...props }) => {
  const [activeTab, setActiveTab] = React.useState(
    props.defaultValue || props.value || ''
  );
  const [indicatorStyle, setIndicatorStyle] =
    React.useState<React.CSSProperties>({});

  const triggersRef = React.useRef<Record<string, HTMLButtonElement | null>>(
    {}
  );

  React.useEffect(() => {
    const el = triggersRef.current[activeTab];
    if (el && el.parentElement) {
      const containerWidth = el.parentElement.clientWidth;
      const offsetFromRight = containerWidth - (el.offsetLeft + el.offsetWidth);

      setIndicatorStyle({
        width: `${el.offsetWidth}px`,
        transform: `translateX(-${offsetFromRight}px)`, // ✅ calculate from right for RTL
      });
    }
  }, [activeTab]);

  return (
    <Tabs
      {...props}
      className={cn('relative', className)}
      onValueChange={(value) => {
        setActiveTab(value);
        props.onValueChange?.(value);
      }}
    >
      {/* clone triggers to attach refs */}
      {React.Children.map(children, (child: any) => {
        if (!child) return null;
        if (child.type === TabsList) {
          return React.cloneElement(child, {
            children: React.Children.map(
              child.props.children,
              (trigger: any) => {
                if (!trigger) return null;
                if (trigger.type === TabsTrigger) {
                  return React.cloneElement(trigger, {
                    ref: (el: HTMLButtonElement) =>
                      (triggersRef.current[trigger.props.value] = el),
                  });
                }
                return trigger;
              }
            ),
          });
        }
        return child;
      })}

      {/* Sliding indicator */}
      <div
        className="absolute top-1 h-8 bg-brand-600 dark:bg-brand-100 rounded-lg transition-all duration-300 ease-in-out z-0"
        style={indicatorStyle}
      />
    </Tabs>
  );
};

EnhancedTabs.List = TabsList;
EnhancedTabs.Trigger = TabsTrigger;
EnhancedTabs.Content = TabsContent;

export { EnhancedTabs };
