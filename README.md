# WGPA Calculator - Faculty of Computing, SLIIT

A modern, responsive web application for calculating Weighted Grade Point Average (WGPA) specifically designed for the Faculty of Computing at SLIIT.

## 🎯 Features

- **Accurate WGPA Calculation**: Implements the official FoC weighting formula
- **Interactive UI**: Modern split-screen design with gradient backgrounds
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Real-time Validation**: Input validation with visual feedback
- **Sample Data**: Built-in sample data for testing and demonstration
- **Professional Styling**: Cafe Pixel-inspired design with animations

## 🧮 WGPA Formula

**WGPA = (Y1 × 0%) + (Y2 × 20%) + (Y3 × 30%) + (Y4 × 50%)**

### Weighting System
- **Year 1**: 0% (Foundation year - not counted in WGPA)
- **Year 2**: 20%
- **Year 3**: 30%
- **Year 4**: 50%

## 📊 Grading Scale

| Grade | Grade Point |
|-------|-------------|
| A     | 4.00        |
| A-    | 3.67        |
| B+    | 3.33        |
| B     | 3.00        |
| B-    | 2.67        |
| C+    | 2.33        |
| C     | 2.00        |
| C-    | 1.67        |
| D     | 1.00        |
| F/E   | 0.00        |

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Installation
1. Download or clone this repository
2. Open `index.html` in your web browser
3. Start calculating your WGPA!

### Usage
1. **Select Your Current Year**: Choose your current academic year (1-4)
2. **Enter Semester GPAs**: Input your semester GPAs for each year
3. **Calculate**: Click the "Calculate WGPA" button
4. **View Results**: See your year GPAs and final WGPA

## 🧪 Example Calculation

### Sample Data
- **Year 1 GPA**: 3.50
- **Year 2 GPA**: 3.60
- **Year 3 GPA**: 3.70
- **Year 4 GPA**: 3.90

### Calculation
```
WGPA = (3.5 × 0.0) + (3.6 × 0.2) + (3.7 × 0.3) + (3.9 × 0.5)
     = 0 + 0.72 + 1.11 + 1.95
     = 3.78
```

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with gradients and animations
- **JavaScript (ES6+)**: Interactive functionality and calculations
- **Bootstrap 5**: Responsive grid system and components
- **Font Awesome**: Icons and visual elements

### File Structure
```
GPA_By_Venu/
├── index.html          # Main HTML file
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript logic and calculations
└── README.md           # Project documentation
```

### Key Functions

#### `calculateSemesterGPA(modules)`
Calculates GPA from individual module grades and credits.

#### `calculateYearGPA(sem1GPA, sem2GPA)`
Averages two semester GPAs to get yearly GPA.

#### `calculateWGPA(yearGPAs)`
Applies FoC weighting formula to calculate final WGPA.

#### `letterGradeToPoint(letterGrade)`
Converts letter grades to numerical grade points.

## 🎨 Design Features

- **Split-screen Layout**: Calculator on left, information on right
- **Gradient Backgrounds**: Modern purple-blue gradient theme
- **Glass Morphism**: Semi-transparent containers with blur effects
- **Smooth Animations**: Loading states, success pulses, and transitions
- **Responsive Grid**: Adapts to different screen sizes
- **Interactive Elements**: Hover effects and visual feedback

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full split-screen layout
- **Tablet**: Stacked layout with maintained functionality
- **Mobile**: Single-column layout with touch-friendly controls

## 🔧 Customization

### Changing Weights
To modify the weighting system, edit the `focWeights` array in `script.js`:

```javascript
const focWeights = [0, 0.2, 0.3, 0.5]; // [Y1, Y2, Y3, Y4]
```

### Modifying Grading Scale
Update the `gradePoints` object in `script.js`:

```javascript
const gradePoints = {
    'A': 4.00, 'A-': 3.67, 'B+': 3.33, 'B': 3.00,
    // ... add or modify grades as needed
};
```

### Styling Changes
Modify `styles.css` to change colors, fonts, or layout:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
}
```

## 🧪 Testing

### Built-in Sample Data
Click the "Load Sample Data" button to test with the example calculation:
- Year 1: 3.50 GPA
- Year 2: 3.60 GPA  
- Year 3: 3.70 GPA
- Year 4: 3.90 GPA
- **Expected WGPA**: 3.78

### Manual Testing
1. Enter different GPA values
2. Test with incomplete data (some semesters empty)
3. Verify calculations match expected results
4. Test responsive design on different devices

## 📄 License

This project is created for educational purposes and the Faculty of Computing at SLIIT.

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve the calculator.

## 📞 Support

For questions or support, please contact the developer or refer to the SLIIT Faculty of Computing guidelines.

---

**Developed By Venura Jayasingha**  
*Accurate WGPA calculations for academic excellence* 
