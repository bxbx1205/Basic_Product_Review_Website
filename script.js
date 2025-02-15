const reviewsContainer = document.getElementById('reviews-container');

// Tab Switching
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelector('.tab.active').classList.remove('active');
        tab.classList.add('active');
        document.querySelector('.tab-content.active').classList.remove('active');
        document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
    });
});

// Star Rating Logic
document.querySelectorAll('.stars').forEach(starsContainer => {
    starsContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'SPAN') {
            let value = e.target.getAttribute('data-value');
            let stars = e.target.parentNode.querySelectorAll('span');
            
            // Set the 'active' class for all stars up to the clicked one
            stars.forEach(star => {
                if (star.getAttribute('data-value') <= value) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }
            });
        }
    });
});

// Submit Review Logic
function submitReview() {
    const overallRating = document.querySelector('#overall-stars .active:last-child')?.getAttribute('data-value') || 0;
    const reviewText = document.getElementById('review-text').value;
    const photoInput = document.getElementById('photo');
    const photoURL = photoInput.files[0] ? URL.createObjectURL(photoInput.files[0]) : '';

    const featureRatings = {};
    document.querySelectorAll('.feature-review .stars').forEach(feature => {
        const featureName = feature.getAttribute('data-feature');
        const featureRating = feature.querySelector('.active:last-child')?.getAttribute('data-value') || 0;
        featureRatings[featureName] = featureRating;
    });

    const reviewCard = document.createElement('div');
    reviewCard.classList.add('review-card');
    reviewCard.innerHTML = `
        <p><strong>Overall Rating:</strong> ${overallRating} ★</p>
        <p><strong>Durability:</strong> ${featureRatings.durability} ★</p>
        <p><strong>Design:</strong> ${featureRatings.design} ★</p>
        <p><strong>Value for Money:</strong> ${featureRatings.value} ★</p>
        <p>${reviewText}</p>
        ${photoURL ? `<img src="${photoURL}" alt="Review Photo">` : ''}
    `;
    reviewsContainer.appendChild(reviewCard);

    // Clear all inputs and reset stars
    document.querySelectorAll('.stars span').forEach(star => star.classList.remove('active'));
    document.getElementById('review-text').value = '';
    document.getElementById('photo').value = '';
}
