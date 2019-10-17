json.array! @users do |user|
  json.user_name user.name
  json.user_id user.id
end