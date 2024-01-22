import Header from '@app/components/common/header';
import Banner from '@app/components/home/banner';
import FAQs from '@app/components/home/faqs';
import GetStarted from '@app/components/home/get-started';
import HowItWorks from '@app/components/home/how-it-works';
import WhyUs from '@app/components/home/why-us';
import React from 'react';

function Home() {
	return (
		<>
			<Header />
			<Banner />
			<HowItWorks />
			<GetStarted />
			<WhyUs />
			<FAQs />
		</>
	);
}

export default Home;
