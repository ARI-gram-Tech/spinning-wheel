document.addEventListener('DOMContentLoaded', () => {
  const wheel = document.getElementById('wheel');
  const spinBtn = document.getElementById('spinBtn');
  const resultDisplay = document.getElementById('result');
  
  let isSpinning = false;
  let currentRotation = 0;
  
  // Prize configuration
  const prizes = [
    { name: "Premium Gift", color: "#FF9AA2" },
    { name: "VIP Ticket", color: "#FFB7B2" },
    { name: "Grand Trophy", color: "#FFDAC1" },
    { name: "Diamond Reward", color: "#E2F0CB" },
    { name: "Travel Voucher", color: "#B5EAD7" },
    { name: "Cash Prize", color: "#C7CEEA" }
  ];
  
  // Spin the wheel
  spinBtn.addEventListener('click', () => {
    if (isSpinning) return;
    
    isSpinning = true;
    spinBtn.disabled = true;
    resultDisplay.textContent = "Spinning...";
    
    // Random spin (5-10 full rotations plus segment offset)
    const spinDegrees = 1800 + Math.floor(Math.random() * 1800);
    const winningSegment = Math.floor(Math.random() * 6);
    const finalRotation = currentRotation + spinDegrees + (60 * winningSegment);
    
    wheel.style.transform = `rotate(${-finalRotation}deg)`;
    
    // After spin completes
    setTimeout(() => {
      isSpinning = false;
      spinBtn.disabled = false;
      currentRotation = finalRotation % 360;
      
      // Display result
      showResult(winningSegment);
      createConfetti();
    }, 5500);
  });
  
  // Show winning result
  function showResult(segmentIndex) {
    const prize = prizes[segmentIndex];
    resultDisplay.innerHTML = `
      <span style="color: ${prize.color}">🎉 Congratulations! 🎉</span><br>
      You won: <strong>${prize.name}</strong>
    `;
  }
  
  // Create celebration confetti
  function createConfetti() {
    const colors = ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'];
    
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = `${Math.random() * 0.5}s`;
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 10 + 5}px`;
      
      document.body.appendChild(confetti);
      
      // Remove confetti after animation
      setTimeout(() => {
        confetti.remove();
      }, 3000);
    }
  }
});