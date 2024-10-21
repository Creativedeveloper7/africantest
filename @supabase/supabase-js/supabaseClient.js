

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Fetch data from Supabase
// Define the fetchProducts function first, then export it
const fetchProducts = async () => {
  try {
      const { data, error } = await supabase
          .from('Products')
          .select('*');

      if (error) {
          console.error('Error fetching products:', error);
          return null;
      }

      return data;
  } catch (error) {
      console.error('Error:', error);
      return null;
  }
};

// Export both the function and the supabase client
export { fetchProducts, supabase };