import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const baseConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
}

const withMDX = createMDX({
  options: {
    // Disable automatic MDXProvider injection to avoid using React context in RSC
    // MDX pages can still use client components explicitly when needed.
    providerImportSource: undefined,
  },
})

export default withMDX(baseConfig)