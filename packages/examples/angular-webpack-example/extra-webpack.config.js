module.exports = {
  plugins: [
    require('@import-meta-env/unplugin').webpack({
      example: '.env.example.public'
    })
  ]
}
