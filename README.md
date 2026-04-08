# 🍽️ AI-Powered Recipe Recommender System

An intelligent recipe recommendation system that leverages multiple machine learning approaches including Neural Collaborative Filtering (NCF), Content-Based Filtering, and Collaborative Filtering to provide personalized recipe suggestions.

## 📋 Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [System Architecture](#system-architecture)
- [Models](#models)
- [Data Pipeline](#data-pipeline)

## ✨ Features

### Core Functionality
- **Multi-Model Recommendations**: Three different recommendation algorithms (NCF, Content-Based, Collaborative Filtering)
- **Interactive Web Interface**: Built with Streamlit for seamless user experience
- **Recipe Search**: Autocomplete-enabled search functionality
- **YouTube Integration**: Automatic video recipe fetching with thumbnails
- **Social Sharing**: WhatsApp sharing integration
- **User Tracking**: Click tracking and interaction logging
- **Model Comparison**: RMSE evaluation across all models
- **Detailed Recipe View**: Ingredients, instructions, prep/cook times, ratings

### User Experience
- Dark theme optimized UI
- Responsive 3-column grid layout
- Author-based personalization
- Adjustable recommendation count (1-10)
- Real-time model switching

## 📁 Project Structure

```
RecipeRecommender_AI-main/
├── app/
│   ├── app.py                    # Main Streamlit application
│   └── ui_utils.py               # UI utility functions
├── core/
│   ├── model_pipeline.py         # ML model training & evaluation pipeline
│   ├── preprocessing.py          # Data cleaning & preprocessing
│   └── recommender.py            # Recommendation engine
├── scraping/
│   └── selenium_scraper.py       # Web scraper for recipe data
├── data/
│   ├── recipe_urls.csv           # Scraped recipe URLs
│   ├── recipes_dataset.csv       # Raw recipe data
│   ├── recipes_final_dataset.csv # Complete scraped recipes
│   ├── subcategory_recipes.csv   # Categorized recipes
│   └── recipes_cleaned.csv       # Preprocessed data (generated)
├── utils/
│   ├── config.py                 # Configuration settings
│   └── helpers.py                # Helper functions
├── tests/
│   └── test_core.py              # Unit tests
├── .streamlit/
│   └── config.toml               # Streamlit theme configuration
├── requirements.txt              # Python dependencies
└── chromedriver.exe              # Selenium WebDriver
```

## 🛠️ Technologies Used

### Machine Learning & Data Science
- **PyTorch**: Neural network implementation (NCF model)
- **scikit-learn**: TF-IDF vectorization, cosine similarity, model evaluation
- **pandas**: Data manipulation and analysis
- **numpy**: Numerical computations

### Web Framework & UI
- **Streamlit**: Interactive web application framework
- **requests**: HTTP requests for YouTube integration
- **BeautifulSoup**: HTML parsing

### Web Scraping
- **Selenium**: Automated browser interaction
- **ChromeDriver**: Browser automation driver

## 📦 Installation

### Prerequisites
- Python 3.8+
- Chrome browser (for scraping)

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd RecipeRecommender_AI-main
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Additional dependencies** (if needed)
```bash
pip install beautifulsoup4 selenium requests
```

4. **Prepare data**
   - Ensure `data/recipes_cleaned.csv` exists
   - Or run preprocessing: `python core/preprocessing.py`

5. **Train models** (optional)
```bash
python core/model_pipeline.py
```

## 🚀 Usage

### Running the Application

```bash
streamlit run app/app.py
```

The application will open in your default browser at `http://localhost:8501`

### Using the Interface

1. **Select User**: Choose an author from the sidebar (acts as user profile)
2. **Choose Model**: Select recommendation algorithm (NCF/Content-Based/Collaborative)
3. **Set Recommendations**: Adjust slider for number of suggestions (1-10)
4. **Search Recipes**: Use autocomplete search bar to find specific recipes
5. **View Details**: Click on recipes to see full details, ingredients, and instructions
6. **Watch Videos**: Click video links to view YouTube tutorials
7. **Share**: Use WhatsApp sharing for recipes
8. **Compare Models**: Click "Compare Model RMSEs" to evaluate performance

### Data Scraping

To scrape new recipe data:

```bash
python scraping/selenium_scraper.py
```

This will:
1. Extract recipe URLs from categories
2. Scrape detailed recipe information
3. Save to `data/recipes_final_dataset.csv`

### Data Preprocessing

To clean and preprocess scraped data:

```bash
python core/preprocessing.py
```

This performs:
- Removal of null values
- Ingredient formatting (lowercase, separator cleanup)
- Instruction formatting (strip, capitalize)
- Saves to `data/recipes_cleaned.csv`

## 🏗️ System Architecture

### Data Flow

```
Web Scraping → Raw Data → Preprocessing → Cleaned Data → Model Training → Recommendations
```

### Component Interaction

1. **Scraper** (`selenium_scraper.py`): Collects recipe data from web sources
2. **Preprocessor** (`preprocessing.py`): Cleans and formats data
3. **Model Pipeline** (`model_pipeline.py`): Trains and evaluates ML models
4. **Recommender** (`recommender.py`): Generates personalized recommendations
5. **App** (`app.py`): Presents UI and handles user interactions

## 🤖 Models

### 1. Neural Collaborative Filtering (NCF)

**Architecture:**
- User & Item embeddings (50 dimensions)
- Fully connected layers: 128 → 64 → 1
- ReLU activations
- Sigmoid output for rating prediction

**Training:**
- Optimizer: Adam (lr=0.001)
- Loss: MSE
- Epochs: 10
- Train/Test split: 80/20

**Features:**
- Learns user-item interactions
- Captures non-linear patterns
- Handles sparse data effectively

### 2. Content-Based Filtering

**Approach:**
- TF-IDF vectorization of recipe titles
- Cosine similarity between recipes
- Recommends similar recipes based on content

**Advantages:**
- No cold-start problem for items
- Explainable recommendations
- Works with limited user data

### 3. Collaborative Filtering

**Method:**
- User-item rating matrix
- User-user similarity (cosine)
- Predicts ratings based on similar users

**Benefits:**
- Discovers unexpected patterns
- Leverages community preferences
- No content analysis required

## 📊 Data Pipeline

### Scraping Process

1. **URL Collection**: Extract recipe category URLs
2. **Subcategory Extraction**: Gather individual recipe links
3. **Detail Scraping**: Fetch complete recipe information
   - Title, author, rating
   - Ingredients, instructions
   - Prep/cook/total time
   - Servings, images

### Preprocessing Steps

1. **Data Loading**: Read raw CSV files
2. **Cleaning**: Remove null/empty values
3. **Ingredient Processing**: Lowercase, separator normalization
4. **Instruction Processing**: Strip whitespace, capitalize
5. **Export**: Save cleaned dataset

### Model Training Pipeline

1. **Data Preparation**:
   - Encode users and items
   - Normalize ratings (0-1 scale)
   - Split train/test sets

2. **NCF Training**:
   - Initialize embeddings
   - Train neural network
   - Save model weights

3. **Evaluation**:
   - Calculate RMSE for all models
   - Compare performance
   - Return metrics

## 📈 Model Evaluation

Models are evaluated using **Root Mean Square Error (RMSE)**:
- Lower RMSE = Better predictions
- Comparison available in UI
- Real-time evaluation on test data

## 🎨 UI Customization

Theme configured in `.streamlit/config.toml`:
- **Base**: Dark theme
- **Primary Color**: Warm orange (#FF9800)
- **Background**: Deep dark (#0E1117)
- **Text**: Light (#FAFAFA)

## 🔧 Configuration

Key paths and settings can be modified in:
- `app/app.py`: DATA_PATH, MODEL_PATH
- `scraping/selenium_scraper.py`: Output paths, batch sizes
- `core/preprocessing.py`: Input/output file paths

## 📝 Data Schema

### recipes_cleaned.csv
- `title`: Recipe name
- `author`: Recipe creator
- `rating`: User rating (0-5)
- `ingredients`: Pipe-separated list
- `instructions`: Pipe-separated steps
- `prep_time`: Preparation time
- `cook_time`: Cooking time
- `total_time`: Total time
- `servings`: Number of servings
- `image_url`: Recipe image URL
- `url`: Source URL

## 🤝 Contributing

To extend the project:
1. Add new recommendation algorithms in `core/`
2. Enhance UI components in `app/`
3. Improve scraping logic in `scraping/`
4. Add tests in `tests/`

## 📄 License

ChromeDriver is included with its own license (see `LICENSE.chromedriver` and `THIRD_PARTY_NOTICES.chromedriver`)

## 🐛 Troubleshooting

**Model not found error:**
- Run `python core/model_pipeline.py` to train and save model

**Scraping issues:**
- Update ChromeDriver to match Chrome version
- Check internet connection
- Verify target website structure

**Import errors:**
- Ensure all dependencies installed: `pip install -r requirements.txt`
- Check Python version compatibility (3.8+)

## 🚀 Future Enhancements

- User authentication and profiles
- Recipe rating and review system
- Dietary restriction filters
- Ingredient-based search
- Meal planning features
- Mobile app version
- API endpoints for integration

---

**Built with ❤️ for food lovers and AI enthusiasts**
