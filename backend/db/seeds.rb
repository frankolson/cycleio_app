# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create! [
  { email: 'will@gmail.com', password: 'password', password_confirmation: 'password' },
  { email: 'george@gmail.com', password: 'password', password_confirmation: 'password' },
  { email: 'alex@gmail.com', password: 'password', password_confirmation: 'password' },
]

20.times do
  Recipe.create(
    title: 'Star Wars',
    description: <<-TEXT
    <p>Phasellus a dapibus orci, at bibendum sapien. Aliquam gravida volutpat rhoncus. Etiam justo quam, varius vel volutpat vel, ullamcorper ac lorem. Aliquam id arcu elit. Curabitur suscipit orci vel mauris accumsan, quis sodales nulla fringilla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
    <ol>
    <li>Aenean ipsum erat, euismod ac auctor feugiat, posuere eget nisi.</li>
    <li>Vivamus et ornare urna.</li>
    <li>Quisque purus ipsum, semper in tincidunt sit amet, suscipit eu arcu.</li>
    <li>Maecenas faucibus risus in nunc lacinia, interdum ultricies massa elementum.</li>
    <li>Nullam semper et ante semper condimentum.</li>
    </ol>
    TEXT
  )
end

User.all.each do |user|
  rand(1..10).times do
    user.favorite Recipe.limit(1).order("RANDOM()").first
  end
end