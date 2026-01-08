import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

const supabase = createClient(supabaseUrl, supabaseKey)

async function createDummyUser() {
  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email: "rz.wirsha@gmail.com",
      password: "pukig4r1T",
      email_confirm: true,
    })

    if (error) {
      console.error("Error creating user:", error)
      return
    }

    console.log("Dummy user created successfully:", data.user?.id)
  } catch (err) {
    console.error("Exception:", err)
  }
}

createDummyUser()
