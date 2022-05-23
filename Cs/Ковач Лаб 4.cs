using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ковач_Лаб_5
{
    internal class Program
    {
        static void Main(string[] args)
        {
            TCircle circle1 = new TCircle(3, 1, 1);
            TCircle circle2 = new TCircle();
            TCircle circle3 = new TCircle(circle1);

            Console.WriteLine(circle1);
            Console.WriteLine(circle1.R);
            Console.WriteLine(circle1.X);
            Console.WriteLine(circle1.Y);
            Console.WriteLine(circle1.S());
            Console.WriteLine(circle1.Belongs(2, 2));
            Console.WriteLine(circle1.Belongs(6, 6));
            Console.WriteLine(circle1 + 2);
            Console.WriteLine(circle1 - 2);
            Console.WriteLine(circle1 * 2);
        }
        class TCircle
        {
            private double r;
            public double R { get { return r; } set { r = (value >= 0.1 ? value : 0.1); } }

            private double x;
            public double X { get { return x; } set { x = value; } }

            private double y;
            public double Y { get { return y; } set { y = value; } }

            public TCircle()
            {
                r = 1;
                x = 0;
                y = 0;
            }
            public TCircle(double radius, double x, double y)
            {
                this.r = radius;
                this.x = x;
                this.y = y;
            }
            public TCircle(TCircle circle)
            {
                r = circle.R;
                x = circle.X;
                y = circle.Y;
            }

            public double S()
            {
                return Math.PI * r * r;
            }

            public bool Belongs(double x, double y)
            {
                if (Math.Sqrt(Math.Pow(x - this.x, 2) + Math.Pow(y - this.y, 2)) <= r)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }

            public static TCircle operator +(TCircle circle1, double num)
            {
                return new TCircle(circle1.r + num, circle1.x, circle1.y);
            }
            public static TCircle operator -(TCircle circle1, double num)
            {
                return new TCircle(circle1.r - num, circle1.x, circle1.y);
            }
            public static TCircle operator *(TCircle circle1, double num)
            {
                return new TCircle(circle1.r * num, circle1.x, circle1.y);
            }

            public static TCircle operator +(double num, TCircle circle1)
            {
                return new TCircle(circle1.r + num, circle1.x, circle1.y);
            }
            public static TCircle operator -(double num, TCircle circle1)
            {
                return new TCircle(circle1.r - num, circle1.x, circle1.y);
            }
            public static TCircle operator *(double num, TCircle circle1)
            {
                return new TCircle(circle1.r * num, circle1.x, circle1.y);
            }

            public override string ToString()
            {
                return $"Circle with radius {r}, center: ({x},{y})";
            }

            ~TCircle()
            {
                //Console.WriteLine("Circle lifespan ended");
            }
        }
    }
}
