import React from 'react'

const TimeAndLocation = ({weather:{ formattedLocalTime, name, country}}) => {
    return (
        <div className='2xl'>
            <div className='flex items-center justify-center my-6'>
                <p className='text-xl font-extralight'>
                    {formattedLocalTime}
                    </p>
                
            </div>

            <div className='flex items-center justify-center my-3'>
                <p className='text-2xl font-bold'>
                    {[name,country].join(', ')}
                </p>
            </div>
        </div>
    )
};

export default TimeAndLocation