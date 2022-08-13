import autoprefixer from "autoprefixer"
import tailwind from "tailwindcss"
import tailwindConfig from "./tailwind.config.cjs"

module.exports = {
  plugins: [
    tailwind(tailwindConfig),
    autoprefixer
  ]
  //  plugins: {
  //    tailwindcss: {},
  //    autoprefixer: {},
  //  },
}
