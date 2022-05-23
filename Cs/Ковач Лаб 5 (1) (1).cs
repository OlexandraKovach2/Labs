using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ковач_Лаб_4
{
    internal class Program
    {
        static void Main(string[] args)
        {
            TFraction fraction1 = new TFraction(10, 25);
            TFraction fraction2 = new TFraction();
            TFraction fraction3 = new TFraction(fraction2);

            Console.WriteLine(fraction1);
            Console.WriteLine(fraction2);
            Console.WriteLine(fraction3);

            fraction1.Reduction();

            Console.WriteLine(fraction1);


            Console.WriteLine(fraction1 + fraction2);
            Console.WriteLine(fraction1 - fraction2);
            Console.WriteLine(fraction1 * fraction2);
            Console.WriteLine(fraction1 / fraction2);

            TMixFraction mixfraction1 = new TMixFraction(3, 3, 4);
            TMixFraction mixfraction2 = new TMixFraction();
            TMixFraction mixfraction3 = new TMixFraction(mixfraction2);

            Console.WriteLine(mixfraction1);
            Console.WriteLine(mixfraction2);
            Console.WriteLine(mixfraction3);

            Console.WriteLine(mixfraction1 + mixfraction2);
            Console.WriteLine(mixfraction1 - mixfraction2);
            Console.WriteLine(mixfraction1 * mixfraction2);
            Console.WriteLine(mixfraction1 / mixfraction2);
        }

        public class TFraction
        {
            protected int numerator; // Чисельник 
            public int Numerator { get { return numerator; } set { numerator = value; } }

            protected int denominator; // Знаменник 
            public int Denominator { get { return denominator; } set { denominator = (value != 0 ? value : 1); } } // не може дорівнювати 0

            public TFraction()
            {
                numerator = 1;
                denominator = 2;
            }
            public TFraction(int numerator, int denominator)
            {
                this.numerator = numerator;
                this.denominator = denominator;
            }
            public TFraction(TFraction fraction)
            {
                this.numerator = fraction.numerator;
                this.denominator = fraction.denominator;
            }

            public void Reduction()
            {
                while (true)
                {
                    if (numerator % 2 == 0 && denominator % 2 == 0)
                    {
                        numerator /= 2;
                        denominator /= 2;
                        continue;
                    }
                    else if (numerator % 3 == 0 && denominator % 3 == 0)
                    {
                        numerator /= 3;
                        denominator /= 3;
                        continue;
                    }
                    else if (numerator % 5 == 0 && denominator % 5 == 0)
                    {
                        numerator /= 5;
                        denominator /= 5;
                        continue;
                    }
                    else if (numerator % 7 == 0 && denominator % 7 == 0)
                    {
                        numerator /= 7;
                        denominator /= 7;
                        continue;
                    }
                    else { break; }
                }
            }

            public static TFraction operator +(TFraction fraction1, TFraction fraction2)
            {
                return new TFraction(fraction1.numerator * fraction2.denominator + fraction1.denominator * fraction2.numerator,
                    fraction1.denominator * fraction2.denominator);
            }
            public static TFraction operator -(TFraction fraction1, TFraction fraction2)
            {
                return new TFraction(fraction1.numerator * fraction2.denominator - fraction1.denominator * fraction2.numerator,
                    fraction1.denominator * fraction2.denominator);
            }
            public static TFraction operator *(TFraction fraction1, TFraction fraction2)
            {
                return new TFraction(fraction1.numerator * fraction2.numerator, fraction1.denominator * fraction2.denominator);
            }
            public static TFraction operator /(TFraction fraction1, TFraction fraction2)
            {
                return new TFraction(fraction1.numerator * fraction2.denominator, fraction1.denominator * fraction2.numerator);
            }

            public override string ToString()
            {
                return $"{numerator}/{denominator}";
            }
        }
        public class TMixFraction : TFraction
        {
            protected int integer;
            public int H { get { return integer; } set { integer = value; } }

            public TMixFraction() : base()
            {
                integer = 0;
            }
            public TMixFraction(int integer, int numerator, int denominator) : base(numerator, denominator)
            {
                this.integer = integer;
            }
            public TMixFraction(TMixFraction fraction) : base(fraction.numerator, fraction.denominator)
            {
                this.integer = fraction.integer;
            }

            public static TMixFraction operator +(TMixFraction fraction1, TMixFraction fraction2)
            {
                return new TMixFraction(
                    0,
                    (fraction1.numerator + fraction1.integer * fraction1.denominator) * fraction2.denominator + fraction1.denominator * (fraction2.numerator + fraction2.integer * fraction2.denominator),
                    fraction1.denominator * fraction2.denominator
                    );
            }
            public static TMixFraction operator -(TMixFraction fraction1, TMixFraction fraction2)
            {
                return new TMixFraction(
                    0,
                    (fraction1.numerator + fraction1.integer * fraction1.denominator) * fraction2.denominator - fraction1.denominator * (fraction2.numerator + fraction2.integer * fraction2.denominator),
                    fraction1.denominator * fraction2.denominator
                    );
            }
            public static TMixFraction operator *(TMixFraction fraction1, TMixFraction fraction2)
            {
                return new TMixFraction(
                    0,
                    (fraction1.numerator + fraction1.denominator * fraction1.integer) * (fraction2.numerator + fraction2.denominator * fraction2.integer),
                    fraction1.denominator * fraction2.denominator
                    );
            }
            public static TMixFraction operator /(TMixFraction fraction1, TMixFraction fraction2)
            {
                return new TMixFraction(
                    0,
                    (fraction1.numerator + fraction1.denominator * fraction1.integer) * (fraction2.numerator + fraction2.denominator * fraction2.integer),
                    fraction1.denominator * fraction2.denominator
                    );
            }

            public override string ToString()
            {
                return $"{integer} {numerator}/{denominator}";
            }
        }
    }
}
