import { motion } from 'framer-motion';
import {
  useScrollAnimation,
  animationVariants,
  hoverVariants,
} from '../hooks/useScrollAnimation';

const AnimatedWrapper = ({
  children,
  animation = 'fadeInUp',
  hover = null,
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className = '',
  style = {},
  as = 'div',
  ...props
}) => {
  const [ref, isVisible] = useScrollAnimation(threshold);

  const MotionComponent = motion[as] || motion.div;

  const customVariants = {
    hidden: {
      ...animationVariants[animation]?.hidden,
      transition: {
        duration,
        delay,
      },
    },
    visible: {
      ...animationVariants[animation]?.visible,
      transition: {
        ...animationVariants[animation]?.visible?.transition,
        duration,
        delay,
      },
    },
  };

  return (
    <MotionComponent
      ref={ref}
      initial='hidden'
      animate={isVisible ? 'visible' : 'hidden'}
      variants={customVariants}
      whileHover={hover ? hoverVariants[hover] : undefined}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

// Specialized animated components for common use cases
export const AnimatedSection = ({ children, ...props }) => (
  <AnimatedWrapper animation='fadeInUp' className='w-full' {...props}>
    {children}
  </AnimatedWrapper>
);

export const AnimatedCard = ({ children, ...props }) => (
  <AnimatedWrapper
    animation='scaleIn'
    hover='scaleUp'
    className='w-full h-full'
    {...props}
  >
    {children}
  </AnimatedWrapper>
);

export const AnimatedText = ({ children, ...props }) => (
  <AnimatedWrapper animation='fadeInUp' delay={0.2} {...props}>
    {children}
  </AnimatedWrapper>
);

export const AnimatedImage = ({ children, ...props }) => (
  <AnimatedWrapper animation='zoomIn' hover='scaleUp' {...props}>
    {children}
  </AnimatedWrapper>
);

export const AnimatedButton = ({ children, ...props }) => (
  <AnimatedWrapper
    animation='bounceIn'
    hover='liftUp'
    className='inline-block'
    {...props}
  >
    {children}
  </AnimatedWrapper>
);

export const AnimatedList = ({ children, ...props }) => (
  <motion.div
    initial='hidden'
    whileInView='visible'
    viewport={{ threshold: 0.1 }}
    variants={animationVariants.staggerContainer}
    className='w-full'
    {...props}
  >
    {children}
  </motion.div>
);

export const AnimatedListItem = ({ children, ...props }) => (
  <motion.div
    variants={animationVariants.staggerItem}
    whileHover={hoverVariants.liftUp}
    {...props}
  >
    {children}
  </motion.div>
);

export const AnimatedHero = ({ children, ...props }) => (
  <AnimatedWrapper animation='dropIn' delay={0.3} className='w-full' {...props}>
    {children}
  </AnimatedWrapper>
);

export const AnimatedBanner = ({ children, ...props }) => (
  <AnimatedWrapper
    animation='slideInUp'
    hover='glow'
    className='w-full'
    {...props}
  >
    {children}
  </AnimatedWrapper>
);

export default AnimatedWrapper;
