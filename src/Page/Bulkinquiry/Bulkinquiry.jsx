import React from 'react'

const Bulkinquiry = () => {
    return (
        <div className='w-full  flex  justify-center'>
            <div className='w-[60%]'>
                <h1 className='pt-5 mb-10 flex justify-start text-4xl font-mono'>
                    Bulk Inquiry
                </h1>
                <div data-aos="fade-up"
                    data-aos-duration="1000">
                    <div className='w-full flex flex-row gap-x-2 mb-5'>
                        <div className="space-y-2 w-[50%]">
                            <label className="text-sm font-medium leading-none font-serif peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="name">Name</label>
                            <input type='name' className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-md border px-3 py-2 text-md file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="name" placeholder="Name" name="name" />
                        </div>
                        <div className="space-y-2 w-[50%]">
                            <label className="text-sm font-medium leading-none font-serif peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="email">Email</label>
                            <input type='email' className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-md border px-3 py-2 text-md file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="email" placeholder="Email *" name="email" />
                        </div>
                    </div>
                    <div className="space-y-2 w-full mb-5">
                        <label className="text-sm font-medium leading-none font-serif peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="name">Phone number</label>
                        <input type='name' className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-md border px-3 py-2 text-md file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="name" placeholder="Phone number" name="name" />
                    </div>
                    <div className="space-y-2 w-full mb-5">
                        <label for="message" className="block mb-2 text-lg font-medium font-serif text-gray-900 dark:text-white">Comment</label>
                        <textarea id="message" rows="4" className="block p-2.5 w-full h-28 resize-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    </div>
                    <button className="ring-offset-background focus-visible:ring-ring flex h-12 w-[13%] font-mono items-center justify-center whitespace-nowrap rounded-md bg-green-900 px-4 py-2 text-lg font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mb-5" type="submit">Send</button>
                </div>
            </div>
        </div>
    )
}

export default Bulkinquiry
