document.addEventListener('DOMContentLoaded', () => {
    // 1. Generate Glowing Particles (Fireflies/Stars)
    const heartsContainer = document.getElementById('backgroundHearts');
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
        createParticle(heartsContainer);
    }

    // 2. Setup 3D Gift Box Interaction
    const giftBox = document.getElementById('giftBox');
    const giftSection = document.getElementById('gift-section');
    const celebrationSection = document.getElementById('celebration-section');

    giftBox.addEventListener('click', () => {
        giftBox.classList.add('open');
        setTimeout(() => {
            giftSection.classList.remove('active');
            giftSection.classList.add('hidden');
            
            setTimeout(() => {
                giftSection.style.display = 'none';
                celebrationSection.classList.add('active');
                createConfetti();
            }, 1000);
        }, 1500);
    });

    // 3. Setup Elegant Envelope & Wax Seal Interaction
    const envelope = document.getElementById('envelope');
    const envelopeInstruction = document.querySelector('.instruction-small');
    const gallery = document.getElementById('gallery');
    const memoriesBtn = document.getElementById('memoriesBtn');
    let isEnvelopeOpen = false;

    envelope.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent immediate closing from the document click listener
        if (!isEnvelopeOpen) {
            isEnvelopeOpen = true;
            envelope.classList.add('open');
            envelopeInstruction.style.opacity = '0'; 
            
            setTimeout(() => {
                celebrationSection.classList.add('celebration-section-open');
                celebrationSection.classList.remove('memories-view'); // Ensure letter shown
            }, 600);

            const letter = document.getElementById('letter');
            
            letter.addEventListener('scroll', () => {
                if (letter.scrollTop + letter.clientHeight >= letter.scrollHeight - 50) {
                    memoriesBtn.classList.remove('hidden');
                    memoriesBtn.classList.add('visible');
                }
            });

            setTimeout(() => {
                if (letter.scrollHeight <= letter.clientHeight + 10) {
                    memoriesBtn.classList.remove('hidden');
                    memoriesBtn.classList.add('visible');
                }
            }, 2000);
        }
    });

    // 4. Click Outside Letter to Close
    document.addEventListener('click', (e) => {
        const letter = document.getElementById('letter');
        
        // If letter is open and we're NOT in memories view
        if (celebrationSection.classList.contains('celebration-section-open') && 
            !celebrationSection.classList.contains('memories-view')) {
            
            // Check if click was outside letter and NOT on envelope
            if (!letter.contains(e.target) && !envelope.contains(e.target)) {
                closeLetter();
            }
        }
    });

    function closeLetter() {
        celebrationSection.classList.remove('celebration-section-open');
        envelope.classList.remove('open');
        isEnvelopeOpen = false;
        envelopeInstruction.style.opacity = '1';
        memoriesBtn.classList.add('hidden');
        memoriesBtn.classList.remove('visible');
    }

    // 5. Reveal Gallery on Button Click
    memoriesBtn.addEventListener('click', () => {
        // Hide the letter so photos are visible
        celebrationSection.classList.add('memories-view');
        
        document.body.classList.add('allow-scroll');
        gallery.style.display = 'flex';
        
        setTimeout(() => {
            gallery.classList.remove('hidden');
            memoriesBtn.style.opacity = '0';
            memoriesBtn.style.pointerEvents = 'none';
        }, 10);
        
        setTimeout(() => {
            gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    });
});

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const size = Math.random() * 3 + 1;
    const delay = Math.random() * 10;
    particle.style.left = `${left}vw`;
    particle.style.top = `${top}vh`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.animationDelay = `-${delay}s`;
    container.appendChild(particle);
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        const colors = ['#ffd166', '#ff4d6d', '#ffc2d1', '#ffffff'];
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        if (Math.random() > 0.5) confetti.style.borderRadius = '50%';
        confetti.style.left = '50vw';
        confetti.style.top = '50vh';
        confetti.style.zIndex = '100';
        confetti.style.pointerEvents = 'none';
        document.body.appendChild(confetti);
        const angle = Math.random() * Math.PI * 2;
        const velocity = 5 + Math.random() * 10;
        const tx = Math.cos(angle) * velocity * 20;
        const ty = Math.sin(angle) * velocity * 20 + 200;
        confetti.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: 1000 + Math.random() * 1000,
            easing: 'cubic-bezier(.37,0,.23,1)',
            fill: 'forwards'
        });
        setTimeout(() => confetti.remove(), 2000);
    }
}
