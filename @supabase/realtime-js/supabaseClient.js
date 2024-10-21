

// Initialize Supabase client
const supabaseUrl = process.env.WEB_APP_SUPABASE_URL
const supabaseKey = process.env.WEB_APP_ANNON_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

// Fetch data from Supabase
async function fetchData() {
  const { data, error } = await supabase
    .from('users')
    .select('*');

  if (error) {
    console.error('Error fetching data:', error);
  } else {
    console.log('Data:', data);
  }
}

module.exports = { fetchData };
