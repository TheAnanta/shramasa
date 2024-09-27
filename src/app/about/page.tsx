import React from "react";

const AboutUs = () => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-center mb-6">
          About Shramasa
        </h1>
        <div className="text-lg about leading-10">
          <div className="flex md:flex-row flex-col justify-between items-center gap-x-12">
            <img
              src="https://framerusercontent.com/images/Zfnas1cM52U6Txl1kRVl4DmW8Ao.png"
              alt="our story"
              className="md:w-1/2 h-1/2 object-cover w-full"
            />
            <section className="my-12">
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p>
                Shramasa was born out of a personal journey of resilience and
                discovery. Our founder, a strong and passionate woman, faced a
                significant health challenge during the Covid-19 pandemic. After
                contracting the virus, she underwent treatment that, while
                successful, took a toll on her physically and
                emotionally—resulting in hair loss and a weakened sense of
                well-being.
              </p>
              <br />
              <p>
                Searching for a natural solution, she turned to Ayurveda, a
                holistic approach that not only helped restore her health but
                also inspired her to develop safe, effective treatments for hair
                care, skin care, and cosmetics. What began as a personal remedy
                has now blossomed into Shramasa—a brand dedicated to sharing the
                power of Ayurveda with women around the world.
              </p>
            </section>
          </div>
          <div className="flex md:flex-row flex-col items-center justify-between mt-6 mb-12 md:space-x-10">
            <section className="text-justify mb-8 md:mb-0 p-8 border border-neutral-600 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p>
                At Shramasa, our mission is to empower women by providing them
                with body-safe, natural chemical products that are rooted in
                traditional Ayurvedic practices. We believe in the healing power
                of nature, and we strive to make high-quality hair and skin care
                accessible to all.
              </p>
              <br />
              <p>
                We are committed to creating products that not only enhance
                beauty but also nurture health. Each formulation is crafted with
                care.
              </p>
            </section>
            {/* <div className="md:flex hidden h-[50vh] border border-neutral-600"></div> */}
            <section className="text-justify bg-[#46A627]/20 dark:bg-[#A3FF87FF]/15 p-8 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4">Our Products</h2>
              <p>
                Shramasa offers a range of body-safe chemicals used in
                cosmetics, hair care, and skin care products. From rejuvenating
                hair oils to nourishing skin treatments, each product is
                designed with the modern woman in mind—someone who values
                quality, safety, and sustainability.
              </p>
              <br />
              <p>
                We work closely with our clients, many of whom are women, to
                share our knowledge and formulas, offering them personalized
                care that suits their specific needs.
              </p>
            </section>
          </div>

          <div className="flex md:flex-row-reverse flex-col items-center justify-between mt-6 mb-12 md:space-x-10">
            <img
              src="https://img.freepik.com/premium-photo/eco-friendly-cosmetics-decorated-with-green-leaves-organic-facial-skincare-makeup-skin-care_825385-1175.jpg"
              alt=""
              className="md:w-1/2 h-1/2 object-cover w-full rounded-xl"
            />
            <section>
              <h2 className="text-2xl font-semibold my-4">Why Choose Us?</h2>
              <p>
                Shramasa is not just a brand—it&apos;s a community built on
                trust, authenticity, and the desire to make a difference in the
                lives of women. Our products are designed for those who want to
                look and feel their best without compromising on safety or
                integrity.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Natural, Ayurvedic formulations</li>
                <li>Body-safe chemicals that are tested and approved</li>
                <li>Commitment to sustainability and ethical sourcing</li>
                <li>Personalized solutions for hair and skin care</li>
              </ul>
            </section>
          </div>

          <section className="my-12">
            <h2 className="text-2xl font-semibold">Join Our Journey</h2>
            <p>
              We invite you to be a part of our journey towards healthier
              beauty. Whether you&apos;re looking for a specific product or
              seeking guidance on natural solutions, Shramasa is here to help.
              Together, we can redefine beauty—naturally.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
