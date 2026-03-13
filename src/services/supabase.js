import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vizjhzefbgkgefvncpax.supabase.co'

const supabaseKey = 'sb_publishable_VmIwVpkQHBmq3Axv91tn4g_xZnyB6gi'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
