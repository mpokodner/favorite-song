document.addEventListener("DOMContentLoaded", () => {
  // Animate elements when they come into view
  const observeElements = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-element").forEach((element) => {
      observer.observe(element);
    });
  };

  // Initialize animations
  observeElements();

  // Tab switching functionality
  document.querySelectorAll(".tab-button").forEach((button, index) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      document
        .querySelectorAll(".tab-button")
        .forEach((btn) => btn.classList.remove("active"));
      document
        .querySelectorAll(".tab-content")
        .forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      button.classList.add("active");
      document.querySelectorAll(".tab-content")[index].classList.add("active");
    });
  });

  // Scroll indicator functionality
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Show/hide scroll indicator based on scroll position
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollIndicator.style.display = "flex";
      } else {
        scrollIndicator.style.display = "none";
      }
    });

    // Initialize scroll indicator state
    scrollIndicator.style.display = window.scrollY > 300 ? "flex" : "none";
  }

  // Theme explorer functionality
  const themeSlider = document.querySelector(".explorer-slider");
  const themeTitle = document.querySelector(".theme-title");
  const themeDescription = document.querySelector(".theme-description");

  if (themeSlider && themeTitle && themeDescription) {
    const themes = [
      {
        title: "Personal Growth",
        description:
          "The album charts a course of personal evolution, from moments of doubt to newfound confidence and wisdom.",
      },
      {
        title: "Connection",
        description:
          "Exploring the bonds between people and how relationships shape our experiences and identities.",
      },
      {
        title: "Resilience",
        description:
          "Finding strength in adversity and the courage to continue when faced with challenges.",
      },
      {
        title: "Nostalgia",
        description:
          "Reflecting on the past and how memories shape our present and future selves.",
      },
      {
        title: "Hope",
        description:
          "Looking forward with optimism and belief in the possibility of positive change.",
      },
    ];

    themeSlider.addEventListener("input", () => {
      const index = parseInt(themeSlider.value);
      themeTitle.textContent = themes[index].title;
      themeDescription.textContent = themes[index].description;
    });
  }

  // Photo journey navigation
  const journeyDots = document.querySelectorAll(".journey-nav-dot");
  const journeySlider = document.querySelector(".journey-slider");

  if (journeyDots.length && journeySlider) {
    journeyDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        journeyDots.forEach((d) => d.classList.remove("active"));
        dot.classList.add("active");
        journeySlider.style.transform = `translateX(-${index * 100}%)`;
      });
    });

    // Auto-advance slides
    let currentSlide = 0;
    const totalSlides = journeyDots.length;

    const advanceSlide = () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      journeyDots.forEach((d) => d.classList.remove("active"));
      journeyDots[currentSlide].classList.add("active");
      journeySlider.style.transform = `translateX(-${currentSlide * 100}%)`;
    };

    setInterval(advanceSlide, 5000); // Change slide every 5 seconds
  }

  // Music player functionality
  const playBtn = document.querySelector(".play-btn");
  const timeSlider = document.querySelector(".time-slider");
  const timeDisplay = document.querySelector(".player-time span:first-child");

  if (playBtn && timeSlider) {
    let isPlaying = false;
    let playInterval;

    playBtn.addEventListener("click", () => {
      isPlaying = !isPlaying;

      if (isPlaying) {
        playBtn.innerHTML = "❚❚"; // Pause symbol

        // Simulate playback by advancing the time slider
        playInterval = setInterval(() => {
          const currentValue = parseInt(timeSlider.value);
          if (currentValue < 100) {
            timeSlider.value = currentValue + 1;
            updateTimeDisplay(currentValue + 1);
          } else {
            clearInterval(playInterval);
            isPlaying = false;
            playBtn.innerHTML = "▶"; // Play symbol
            timeSlider.value = 0;
            updateTimeDisplay(0);
          }
        }, 350); // Update approximately every third of a second for a ~3min song
      } else {
        playBtn.innerHTML = "▶"; // Play symbol
        clearInterval(playInterval);
      }
    });

    timeSlider.addEventListener("input", () => {
      updateTimeDisplay(timeSlider.value);
    });

    function updateTimeDisplay(value) {
      if (timeDisplay) {
        const totalSeconds = Math.floor(3 * 60 * (value / 100)); // Assuming 3-minute song
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        timeDisplay.textContent = `${minutes}:${seconds
          .toString()
          .padStart(2, "0")}`;
      }
    }
  }

  // Interactive guitar canvas
  const guitarCanvas = document.querySelector(".guitar-canvas");

  if (guitarCanvas) {
    const ctx = guitarCanvas.getContext("2d");

    // Set canvas dimensions
    function resizeCanvas() {
      guitarCanvas.width = guitarCanvas.offsetWidth;
      guitarCanvas.height = guitarCanvas.offsetHeight;
      drawGuitar();
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Draw guitar strings
    function drawGuitar() {
      const width = guitarCanvas.width;
      const height = guitarCanvas.height;
      const stringCount = 6;
      const stringSpacing = height / (stringCount + 1);

      ctx.clearRect(0, 0, width, height);

      // Draw guitar body hint
      ctx.fillStyle = "rgba(76, 175, 80, 0.1)";
      ctx.beginPath();
      ctx.ellipse(
        width / 2,
        height / 2,
        width * 0.4,
        height * 0.4,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Draw strings
      for (let i = 1; i <= stringCount; i++) {
        const y = i * stringSpacing;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 6 - i; // Thicker strings at the top
        ctx.stroke();
      }
    }

    // Make strings interactive
    guitarCanvas.addEventListener("mousemove", (e) => {
      const rect = guitarCanvas.getBoundingClientRect();
      const mouseY = e.clientY - rect.top;
      const height = guitarCanvas.height;
      const stringCount = 6;
      const stringSpacing = height / (stringCount + 1);

      // Find which string the mouse is near
      let nearestString = -1;
      let minDistance = stringSpacing / 2;

      for (let i = 1; i <= stringCount; i++) {
        const y = i * stringSpacing;
        const distance = Math.abs(mouseY - y);

        if (distance < minDistance) {
          minDistance = distance;
          nearestString = i;
        }
      }

      // Draw highlighted string
      if (nearestString !== -1) {
        drawGuitar();

        const y = nearestString * stringSpacing;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(guitarCanvas.width, y);
        ctx.strokeStyle = "#4CAF50";
        ctx.lineWidth = 6 - nearestString + 1; // Thicker strings at the top
        ctx.stroke();
      }
    });

    // Simulate string pluck on click
    guitarCanvas.addEventListener("click", (e) => {
      const rect = guitarCanvas.getBoundingClientRect();
      const mouseY = e.clientY - rect.top;
      const height = guitarCanvas.height;
      const stringCount = 6;
      const stringSpacing = height / (stringCount + 1);

      // Find which string was clicked
      let pluckedString = -1;
      let minDistance = stringSpacing / 2;

      for (let i = 1; i <= stringCount; i++) {
        const y = i * stringSpacing;
        const distance = Math.abs(mouseY - y);

        if (distance < minDistance) {
          minDistance = distance;
          pluckedString = i;
        }
      }

      if (pluckedString !== -1) {
        // Visual effect for plucked string
        const y = pluckedString * stringSpacing;
        const amplitude = 10;
        const period = 500; // ms
        const startTime = Date.now();

        function animateString() {
          const elapsed = Date.now() - startTime;
          if (elapsed > period) {
            drawGuitar();
            return;
          }

          drawGuitar();

          // Draw oscillating string
          ctx.beginPath();
          ctx.moveTo(0, y);

          for (let x = 0; x < guitarCanvas.width; x++) {
            const normalizedX = x / guitarCanvas.width;
            const wave =
              Math.sin(normalizedX * Math.PI * 8) *
              Math.sin((elapsed / period) * Math.PI) *
              amplitude *
              (1 - elapsed / period);
            ctx.lineTo(x, y + wave);
          }

          ctx.strokeStyle = "#4CAF50";
          ctx.lineWidth = 6 - pluckedString + 1;
          ctx.stroke();

          requestAnimationFrame(animateString);
        }

        animateString();
      }
    });
  }

  // Memory wall functionality
  const memoryForm = document.querySelector(".memory-form");
  const memoryWall = document.querySelector(".memory-wall");

  if (memoryForm && memoryWall) {
    const memoryInput = memoryForm.querySelector(".memory-input");
    const nameInput = memoryForm.querySelector(".memory-name");
    const submitBtn = memoryForm.querySelector(".memory-submit");

    submitBtn.addEventListener("click", () => {
      const text = memoryInput.value.trim();
      const name = nameInput.value.trim() || "Anonymous";

      if (text) {
        // Create new memory card
        const memoryCard = document.createElement("div");
        memoryCard.className = "memory-card";

        const memoryText = document.createElement("p");
        memoryText.className = "memory-text";
        memoryText.textContent = `"${text}"`;

        const memoryAuthor = document.createElement("p");
        memoryAuthor.className = "memory-author";
        memoryAuthor.textContent = `- ${name}`;

        memoryCard.appendChild(memoryText);
        memoryCard.appendChild(memoryAuthor);

        // Add to wall with animation
        memoryCard.style.opacity = "0";
        memoryWall.prepend(memoryCard);

        // Clear form
        memoryInput.value = "";
        nameInput.value = "";

        // Fade in after being added to DOM
        setTimeout(() => {
          memoryCard.style.opacity = "1";
        }, 10);
      }
    });
  }

  // Create falling leaves dynamically
  function createFallingLeaves() {
    const container = document.body;
    const leafCount = 10;

    for (let i = 0; i < leafCount; i++) {
      const leaf = document.createElement("div");
      leaf.className = "falling-leaf";
      leaf.style.left = `${Math.random() * 100}%`;
      leaf.style.animationDelay = `${Math.random() * 10}s`;
      container.appendChild(leaf);
    }
  }

  // Uncomment if you want to create leaves dynamically instead of static HTML
  createFallingLeaves();
});
