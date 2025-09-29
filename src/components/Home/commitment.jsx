import React from 'react';
import { Globe, Users } from 'lucide-react';

export default function CommitmentSection() {
  return (
    <div className="w-full bg-[#f7fcf6] mt-10">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Image */}
          <div className="relative">
            <img
              src="/Planting.jpg"
              alt="Planting trees"
              className="w-full h-[600px] object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Right side - Content */}
          <div className="space-y-8">
            {/* Header with Badge */}
            <div className="flex items-center justify-center gap-6 ">
              <h2 className="text-5xl font-bold text-gray-900">
                Our Commitment
              </h2>
              <div className="w-24 h-24 rounded-full border-2 border-gray-400 flex items-center justify-center flex-shrink-0">
                {/* <div className="text-center">
                  <div className="text-xs text-gray-600">DESIGNED AND</div>
                  <div className="text-lg font-semibold text-gray-800 italic">Sri Lanka</div>
                  <div className="text-xs text-gray-600">CRAFTED IN</div>
                </div> */}
                <img src="/Group_110.png" alt="" srcset="" />
              </div>
            </div>

            {/* Commitment Cards */}
            <div className="space-y-8">
              {/* Nature Card */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {/* <Globe className="w-12 h-12 text-gray-600" strokeWidth={1.5} /> */}
                  <img src="/planet-earth.png" alt="" srcset="" />
                  <h3 className="text-3xl font-semibold text-gray-900">Our Nature, Our Planet</h3>
                </div>
                <div className="space-y-3 text-gray-700 w-[80%] text-justify">
                  <p>
                    We are deeply aware of the impact of our industry on the environment and take
                    environmental issues to heart.
                  </p>
                  <p>
                    For every tree we consume, we ensure to give back to our planet with our reforestation
                    efforts, and by giving seed pods with every purchase.
                  </p>
                </div>
              </div>

              {/* People Card */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {/* <Users className="w-12 h-12 text-gray-600" strokeWidth={1.5} /> */}
                  <img src="/value.png" alt="" srcset="" />
                  <h3 className="text-3xl font-semibold text-gray-900">Our People, Our Nation</h3>
                </div>
                <div className="space-y-3 text-gray-700 w-[80%] text-justify">
                  <p>
                    We are continuesly working on establishing sustainable relationships with carpenters and
                    artisans in our communities.
                  </p>
                  <p>
                    We empower our local artisans to master their craft and uplift their livelihoods through
                    financial aid and skill upliftment trainings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}