import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://yvzqnnojfxtvewtgmepp.supabase.co",
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2enFubm9qZnh0dmV3dGdtZXBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2MTY3NzUyOSwiZXhwIjoxOTc3MjUzNTI5fQ.Ir9qT6akMVbbz9j-9Um7IFEuwginhpv9LkI-YkmlCpk'
)

export default supabase