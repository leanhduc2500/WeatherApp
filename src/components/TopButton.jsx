import React from "react"

const TopButton = ({ setQuery }) => {
    const cities = [
        {
            id: 1,
            name: "London",
        },
        {
            id: 2,
            name: "Berlin",
        },
        {
            id: 3,
            name: "Hanoi",
        },
        {
            id: 4,
            name: "Thai Binh",
        },
        {
            id: 5,
            name: "Tokyo",
        }
    ]

    return (
        <div className='flex items-center justify-center space-x-4'>
            {
                cities.map(city => {
                    return (
                        <button
                            key={city.id}
                            className='text-wrap font-serif hover:bg-gray-700/20 px-3 py-2 rounded-md transition ease-in'
                            onClick={() => setQuery({ q: city.name })}
                        >
                            {city.name}
                        </button>
                    )
                })
            }

        </div>
    )
}

export default TopButton