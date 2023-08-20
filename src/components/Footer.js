import React from 'react'

const Footer = () => {
    return (
        <footer class="bg-gray-200 rounded-md shadow mt-4">
            <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div class="sm:flex sm:items-center sm:justify-between">
                    <img src="/websiteLogoV2.png" class="h-10 mr-3" alt="Website Logo" />
                    <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <p class="mr-4 hover:underline md:mr-6 hover:cursor-pointer">About</p>
                        </li>
                        <li>
                            <p class="mr-4 hover:underline md:mr-6 hover:cursor-pointer">Privacy Policy</p>
                        </li>
                        <li>
                            <p class="mr-4 hover:underline md:mr-6 hover:cursor-pointer">Licensing</p>
                        </li>
                        <li>
                            <p class="hover:underline hover:cursor-pointer">Contact</p>
                        </li>
                    </ul>
                </div>
                <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <p class="hover:underline hover:cursor-pointer">TheBeadBoutique</p>All Rights Reserved.</span>
            </div>
        </footer>
    )
}

export default Footer