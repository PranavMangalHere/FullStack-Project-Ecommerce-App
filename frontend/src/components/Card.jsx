/* eslint-disable no-unused-vars */
import React from "react";

const Card = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f4f4f4]">
      <div className="w-72 h-48 bg-[#243137] relative grid place-content-center rounded-xl overflow-hidden transition-all duration-500 ease-in-out hover:scale-110 hover:rounded-none">
        <div className="absolute inset-0 border-2 border-[#bd9f67] opacity-0 transform rotate-10 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:rotate-0 group-hover:inset-4" />

        <div className="content transition-all duration-500 ease-in-out">
          <div className="logo h-9 relative w-8 overflow-hidden transition-all duration-1000 ease-in-out group-hover:w-32">
            <div className="logo1 absolute left-0 h-full">
              <svg
                viewBox="0 0 29.667 31.69"
                xmlns="http://www.w3.org/2000/svg"
                id="logo-main"
                className="fill-[#bd9f67] h-full"
              >
                <path
                  transform="translate(0 0)"
                  d="M12.827,1.628A1.561,1.561,0,0,1,14.31,0h2.964a1.561,1.561,0,0,1,1.483,1.628v11.9a9.252,9.252,0,0,1-2.432,6.852q-2.432,2.409-6.963,2.409T2.4,20.452Q0,18.094,0,13.669V1.628A1.561,1.561,0,0,1,1.483,0h2.98A1.561,1.561,0,0,1,5.947,1.628V13.191a5.635,5.635,0,0,0,.85,3.451,3.153,3.153,0,0,0,2.632,1.094,3.032,3.032,0,0,0,2.582-1.076,5.836,5.836,0,0,0,.816-3.486Z"
                />
                <path
                  transform="translate(-45.91 0)"
                  d="M75.207,20.857a1.561,1.561,0,0,1-1.483,1.628h-2.98a1.561,1.561,0,0,1-1.483-1.628V1.628A1.561,1.561,0,0,1,70.743,0h2.98a1.561,1.561,0,0,1,1.483,1.628Z"
                />
                <path
                  transform="translate(0 -51.963)"
                  d="M0,80.018A1.561,1.561,0,0,1,1.483,78.39h26.7a1.561,1.561,0,0,1,1.483,1.628v2.006a1.561,1.561,0,0,1-1.483,1.628H1.483A1.561,1.561,0,0,1,0,82.025Z"
                />
              </svg>
            </div>
            <div className="logo2 absolute left-8 h-full">
              <svg
                viewBox="0 0 101.014 23.535"
                xmlns="http://www.w3.org/2000/svg"
                id="logo-second"
                className="stroke-[#bd9f67] stroke-[1px]"
              >
                <g transform="translate(-1029.734 -528.273)">
                  <path
                    transform="translate(931.023 527.979)"
                    d="M109.133,14.214l3.248-11.706A1.8,1.8,0,0,1,114.114,1.2h2.229a1.789,1.789,0,0,1,1.7,2.358L111.884,21.71a1.8,1.8,0,0,1-1.7,1.216h-3a1.8,1.8,0,0,1-1.7-1.216L99.317,3.554a1.789,1.789,0,0,1,1.7-2.358h2.229a1.8,1.8,0,0,1,1.734,1.312l3.248,11.706a.468.468,0,0,0,.9,0Z"
                  />
                </g>
              </svg>
            </div>
            <span className="trail absolute right-0 h-full w-full opacity-0" />
          </div>

          <span className="logo-bottom-text absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-7 text-[#bd9f67] px-2 text-[11px] opacity-0 group-hover:opacity-100 group-hover:tracking-wider group-hover:mt-0 duration-500 ease-in-out">
              ZOOSKO  
          </span>
        </div>

        <span className="bottom-text absolute left-1/2 bottom-3 transform -translate-x-1/2 text-[6px] text-[#bd9f67] bg-[#243137] opacity-0 uppercase px-1 py-0.5 tracking-[7px] group-hover:opacity-100 group-hover:tracking-[3px] duration-500 ease-in-out">

        </span>
      </div>
    </div>
  );
};

export default Card;
