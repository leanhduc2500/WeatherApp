import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { FiEye } from "react-icons/fi";


const TempAndDetails = ({weather: {
    details, 
    icon,
    temp, 
    feels_like, 
    humidity, 
    speed, 
    sunrise, 
    sunset, 
    temp_max, 
    visibility,
    temp_min
}, units}) => {
    const verticalDetails = [
        {
            id: 1,
            Icon: FaThermometerEmpty,
            title: "Feels like",
            value: `${feels_like.toFixed()}° ${units === 'metric' ? "C" : "F"}`
        },
        {
            id: 2,
            Icon: BiSolidDropletHalf,
            title: "Humidity ",
            value:  `${humidity.toFixed()}%`
        },
        {
            id: 3,
            Icon: FiWind,
            title: "Wind ",
            value: `${speed.toFixed()} ${units === 'metric' ? "km/h" : "m/s"}`
        },
        {
            id: 4,
            Icon: FiEye,
            title: "Visibility ",
            value: `${(visibility / 1000).toFixed(1)} km`

            
        }

    ];

    const horizontalDetails = [
        {
            id: 1,
            Icon: GiSunrise,
            title: "Sunrise: ",
            value: sunrise
        },
        {
            id: 2,
            Icon: GiSunset,
            title: "Sunset: ",
            value: sunset
        },
        {
            id: 3,
            Icon: MdKeyboardArrowUp,
            title: "Max Temp: ",
            value: `${temp_max.toFixed()}°${units === 'metric' ? "C" : "F"}`
        },
        {
            id: 4,
            Icon: MdKeyboardArrowDown,
            title: "Min Temp:",
            value: `${temp_min.toFixed()}°${units === 'metric' ? "C" : "F"}`
        }
    ];

    return (

        <div className="xl">
            <div className="flex items-center justify-center py-6 text-xl text-white-400">
                <p>{details}</p>
            </div>
            <div className="flex flex-row items-center justify-between py-3">
                <img
                    src={icon}
                    alt="" 
                    className="w-20 "
                />
                <p className="text-5xl">{`${temp.toFixed()}°${units === 'metric' ? "C" : "F"} `}</p>
                <div className="flex flex-col space-y-3 items-start">
                    {
                        verticalDetails.map(({ id, Icon, title, value }) => (
                            <div key={id} className="flex font-light text-sm items-center justify-center">
                                <Icon size={18} className="mr-1" />
                                {`${title}`}: <span className="font-medium ml-1 ">{value}</span>
                            </div>
                        ))
                    }

                    
                </div>
            </div>
            
                <div className=" flex flex-row items-center justify-between space-x-10 text-sm py-3">
                    {
                        horizontalDetails.map(({ id, Icon, title, value }) => (
                            <div key={id} className=" flex-col flex items-center justify-center ">
                                <Icon size={30} />
                                {`${title}`} <span className="font-medium ml-1 ">{value}</span>
                            </div>
                        ))
                    }
                    <div></div>
                </div>

        </div>
    );
}

export default TempAndDetails