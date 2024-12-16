
const Support = () => {
    return (
        <div className="min-h-screen flex flex-col px-6 sm:px-20 py-10 bg-white">
            {/* Page Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-10">Soporte</h1>

            {/* Content Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Terms and Conditions */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Términos y condiciones
                    </h2>
                    <p className="text-gray-600 leading-7">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ornare
                        tincidunt facilisis. Nulla aliquam, tellus eu laoreet rutrum, magna lectus
                        pulvinar mi, a interdum risus neque ac lorem. Curabitur et.
                        <br />
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ornare
                        tincidunt facilisis. Nulla aliquam, tellus eu laoreet rutrum, magna lectus
                        pulvinar mi, a interdum risus neque ac lorem.
                        <br />
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ornare
                        tincidunt facilisis. Nulla aliquam, tellus eu laoreet rutrum, magna lectus
                        pulvinar mi, a interdum risus neque ac lorem.
                    </p>
                </div>

                {/* Refund Policies */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Políticas de reembolso
                    </h2>
                    <p className="text-gray-600 leading-7">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ornare
                        tincidunt facilisis. Nulla aliquam, tellus eu laoreet rutrum, magna lectus
                        pulvinar mi, a interdum risus neque ac lorem.
                        <br />
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ornare
                        tincidunt facilisis. Nulla aliquam, tellus eu laoreet rutrum, magna lectus
                        pulvinar mi, a interdum risus neque ac lorem.
                    </p>

                    {/* Contact Section */}
                    <div className="mt-6 flex items-center gap-4 p-4 bg-white shadow-md rounded-lg">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                            <span className="text-blue-600 text-lg">📢</span> {/* Icon */}
                        </div>
                        <p className="text-gray-800 font-medium">
                            Contáctanos <span className="text-blue-600">8881-6815-452</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;