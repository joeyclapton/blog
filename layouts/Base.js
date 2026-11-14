import { styled, keyframes } from '../stitches.config'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PostMain, PostContent, PostContainer } from '../components/Post'
import { Wrapper } from '../components/Wrapper'

export default function Base({ children }) {
  const { title, tagline, primaryColor, secondaryColor } = children.props

  return (
    <Wrapper>
      <Navbar />
      <PostMain
        css={{
          '& ::selection': {
            background: `$${primaryColor}`,
            color: '#000',
            WebkitTextFillColor: '#000',
          },
        }}
      >
        <PostContent>
          <PostContainer key={title}>
            <GradientTitle
              css={{
                backgroundImage: `linear-gradient(
                135deg,
                $${primaryColor} 0%,
                $${secondaryColor} 50%,
                $${primaryColor} 100%
              );`,
              }}
            >
              {tagline ? tagline : title}
            </GradientTitle>
            {children}
          </PostContainer>
        </PostContent>
      </PostMain>
      <Footer />
    </Wrapper>
  )
}

const shimmer = keyframes({
  from: { backgroundPosition: '0% 50%' },
  to: { backgroundPosition: '100% 50%' },
})

const GradientTitle = styled('h1', {
  backgroundSize: '200% 100%',
  animation: `${shimmer} 6s ease-in-out infinite alternate`,
  '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  MozBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  MozTextFillColor: 'transparent',
  WebkitBoxDecorationBreak: 'clone',
})
