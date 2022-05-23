using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ковач_лаб_6
{
    internal class Program
    {
        static void Main(string[] args)
        {   
            /*
            TArrayInt arrayInt = new TArrayInt(5);
            arrayInt.GetElems();
            arrayInt.AddOne();
            arrayInt.GetElems();
            arrayInt.MinusOne();
            arrayInt.GetElems();
            Console.WriteLine(arrayInt.Average());

            TArrayDouble arrayDouble = new TArrayDouble(5);
            arrayDouble.GetElems();
            arrayDouble.AddOne();
            arrayDouble.GetElems();
            arrayDouble.MinusOne();
            arrayDouble.GetElems();
            Console.WriteLine(arrayDouble.Average());
            */

            Console.Write("Enter M: ");
            int m = int.Parse(Console.ReadLine());

            List<TArray> arrays = new List<TArray>();

            for (int i = 0; i < m; i++)
            {
                arrays.Add(new TArrayInt(5));
                arrays.Add(new TArrayDouble(5));
            }

            int index = 0;
            double max = arrays[0].Average();

            for (int i = 0; i < arrays.Count; i++)
            {
                if (arrays[i].Average() > max)
                {
                    max = arrays[i].Average();
                    index = i;
                }
            }

            Console.WriteLine($"Max average = {max} with index = {index} in arrays");
        }

        public abstract class TArray
        {
            public abstract void AddOne();
            public abstract void MinusOne();
            public abstract double Average();
        }

        public class TArrayInt : TArray
        {
            protected List<int> array = new List<int>();
            Random rnd = new Random();

            public TArrayInt(int size)
            {
                for (int i = 0; i < size; i++)
                {
                    array.Add(rnd.Next(1, 11));
                }
            }

            public override void AddOne()
            {
                for (int i = 0; i < array.Count; i++)
                {
                    array[i]++;
                }
            }

            public override void MinusOne()
            {
                for (int i = 0; i < array.Count; i++)
                {
                    array[i]--;
                }
            }

            public override double Average()
            {
                return array.Average();
            }

            public void GetElems()
            {
                foreach (var el in array)
                {
                    Console.WriteLine(el);
                }
                Console.WriteLine("");
            }
        }
        public class TArrayDouble : TArray
        {
            protected List<double> array = new List<double>();
            Random rnd = new Random();

            public TArrayDouble(int size)
            {
                for (int i = 0; i < size; i++)
                {
                    array.Add((double)rnd.Next(10, 101) / 10);
                }
            }

            public override void AddOne()
            {
                for (int i = 0; i < array.Count; i++)
                {
                    array[i]++;
                }
            }

            public override void MinusOne()
            {
                for (int i = 0; i < array.Count; i++)
                {
                    array[i]--;
                }
            }

            public override double Average()
            {
                return array.Average();
            }

            public void GetElems()
            {
                foreach (var el in array)
                {
                    Console.WriteLine(el);
                }
                Console.WriteLine("");
            }
        }
    }
}
