using System;

namespace app
{
    class Program
    {
        static void Main(string[] args)
        {
            int i = 0;
            Console.WriteLine("Previous value of integer i:" + i.ToString());
            string test = GetNextNameByOut(out i);
            Console.WriteLine("Current value of integer i:" + i.ToString());
        }
        public static string GetNextNameByOut(out int id)
        {
            id = 1;
            string returnText = "Next-" + id.ToString();
            
            return returnText;
        }
    }
}
