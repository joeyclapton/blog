import nextConfig from 'eslint-config-next'

export default [
  ...nextConfig,
  {
    rules: {
      'react/jsx-no-target-blank': 0,
      'react/jsx-wrap-multilines': 0,
      'react/no-unescaped-entities': 0,
      'import/no-anonymous-default-export': 0,
      'react-hooks/set-state-in-effect': 0,
    },
  },
]
