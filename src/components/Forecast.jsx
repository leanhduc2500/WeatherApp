import React from "react";

const Forecast = ({ title, data, units }) => {
  return (
    <div className="xl">
      <div className="xl flex items-center justify-start mt-6">
        <p className="font-medium uppercase">{title}</p>
      </div>
      <hr className="my-1" />
      <div className="flex items-center justify-between">
        {data.map((d, index) => (
          <div key={index} className="xl flex flex-col items-center justify-center">
            <p className="font-medium">{d.title}</p>
            <img src={d.icon} alt="" className="w-12 my-1" />
            <p className="font-medium">
              {`${d.temp.toFixed()}°${units === "metric" ? "C" : "F"} | ${d.humidity}%`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
