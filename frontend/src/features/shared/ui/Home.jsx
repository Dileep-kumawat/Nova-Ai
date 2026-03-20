import { useEffect } from 'react';
import '../styles/variables.css';
import '../styles/home.css';

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import ProductShowcase from '../components/ProductShowcase';
import ConsensusSection from '../components/ConsensusSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import useHomeAnimations from '../hooks/useHomeAnimations';

const Home = () => {

    const user = useSelector(state => state.auth.user);

    // GSAP scroll-driven animations
    useHomeAnimations();

    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const handleScroll = () => {
            let current = '';
            sections.forEach((section) => {
                if (window.pageYOffset >= section.offsetTop - 120) {
                    current = section.getAttribute('id');
                }
            });
            navLinks.forEach((link) => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth scroll for anchor links
    useEffect(() => {
        const anchors = document.querySelectorAll('a[href^="#"]');

        const handleClick = (e) => {
            const target = document.querySelector(e.currentTarget.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        };

        anchors.forEach((anchor) => anchor.addEventListener('click', handleClick));
        return () => anchors.forEach((anchor) => anchor.removeEventListener('click', handleClick));
    }, []);

    return (
        <>
            <Navbar user={user} />
            <main>
                <HeroSection user={user} />
                <FeaturesSection />
                <ProductShowcase />
                <ConsensusSection />
                <CTASection user={user} />
            </main>
            <Footer />
        </>
    );
};

export default Home;