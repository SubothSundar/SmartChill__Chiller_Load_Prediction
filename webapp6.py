import streamlit as st
import pickle
import numpy as np

# Load the trained model (assumed to be stored as 'model.pkl')
with open('model.pkl', 'rb') as file:
    model = pickle.load(file)

# Constants for energy rates in India and average efficiency
average_efficiency = 0.8  # Example, modify as per actual data
energy_rate_per_kwh = 6.0  # Energy rate in INR per kWh

# Business model: commission rate
commission_rate = 0.05  # 5% commission on saved amount

# Custom CSS to style the landing page, title, and output text boxes
def set_background_image(image_path):
    page_bg_img = f"""
    <style>
    .stApp {{
        background-image: url("data:image/png;base64,{image_path}");
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: center;
    }}

    /* Style for the landing page text box */
    .stApp .custom-text-box {{
        background-color: rgba(0, 0, 0, 0.7);  /* Black background with 0.7 opacity */
        border-radius: 15px;
        padding: 30px;
        width: 100%;
        color: white;
        text-align: justify;
    }}

    /* Style for the title and logo alignment */
    .logo-title {{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        background-color: rgba(0, 0, 0, 0.7); /* Transparent black background for title */
        padding: 20px;
        border-radius: 15px;
    }}

    .logo-title img {{
        margin-right: 20px;  /* Space between logo and title */
    }}

    .logo-title h1 {{
        font-size: 50px;
        font-weight: bold;
        color: white;  /* White title color */
    }}

    .smart {{
        color: gold;  /* Golden color for "SMART" */
    }}

    .chill {{
        color: blue;  /* Blue color for "CHILL" */
    }}

    /* Add more solid background to output text boxes */
    .stAlert {{
        background-color: black;  
        border-radius: 10px;
        padding: 10px;
    }}

    /* Wider content box for the prediction page */
    .custom-prediction-box {{
        background-color: rgba(0, 0, 0, 0.7);  /* Black background with transparency */
        padding: 30px;
        border-radius: 15px;
        color: white;
        width: 100%;  /* Make box wider */
    }}

    /* Style for input labels */
    .input-label {{
        background-color: rgba(0, 0, 0, 0.8);  /* Black background with more opacity for input labels */
        border-radius: 5px;
        padding: 5px;
        font-weight: bold;
        color: white;  /* White text color for visibility */
    }}
    </style>
    """
    st.markdown(page_bg_img, unsafe_allow_html=True)

# Function to load and encode background image
def load_background_image(image_file):
    import base64
    with open(image_file, "rb") as file:
        data = file.read()
    return base64.b64encode(data).decode()

# Set background image
bg_image_path = r"D:\streamlit\bg3.jpg"  # Modify this path accordingly
bg_image_encoded = load_background_image(bg_image_path)
set_background_image(bg_image_encoded)

# Define the landing page
def landing_page():
    # Logo and Title (aligned horizontally)
    st.markdown("""
    <div class="logo-title">
        <img src="data:image/png;base64,{logo_image}" width="150" />
        <h1><span class="smart">SMART</span><span class="chill">CHILL</span></h1>
    </div>
    """.format(logo_image=load_background_image(r"D:\streamlit\logo1.png")), unsafe_allow_html=True)

    st.markdown("""
    <div class="custom-text-box">
        *SmartChill* is a revolutionary system designed to optimize chiller plant performance.
        Our system predicts the "Chiller Load" and "Plant Efficiency", allowing businesses to save energy costs.
        
        With the average energy conversion rates in India, SmartChill helps you save money while promoting sustainability.
        
        ** How does it work?
        1. Input your plant data** and get real-time predictions.
        2. See how much energy you're saving**.
        3. Pay us a commission based on the money saved!

        *Join us on a mission to cool smarter, save more, and reduce your carbon footprint!*  
    </div>
    """, unsafe_allow_html=True)

    if st.button("Go to Prediction Page"):
        st.session_state['page'] = 'prediction_page'

# Define the prediction page
def prediction_page():
    st.markdown("""
    <div class="custom-prediction-box">
        <h1>SmartChill Prediction System</h1>
        <p>Please enter the required inputs to predict <strong>Chiller Load</strong> and <strong>Plant Efficiency</strong>.</p>
    </div>
    """, unsafe_allow_html=True)

    # Input fields for user data (6 inputs)
    st.markdown('<div class="input-label">KW_TOT - TOTAL PLANT POWER</div>', unsafe_allow_html=True)
    input1 = st.number_input('KW_TOT - TOTAL PLANT POWER', min_value=0.0, step=0.01, label_visibility='collapsed')
    
    st.markdown('<div class="input-label">KW_CHH - TOTAL CHILLER POWER</div>', unsafe_allow_html=True)
    input2 = st.number_input('KW_CHH - TOTAL CHILLER POWER', min_value=0.0, step=0.01, label_visibility='collapsed')
    
    st.markdown('<div class="input-label">Precent_CH - PRESENT CHILLER LOAD</div>', unsafe_allow_html=True)
    input3 = st.number_input('Precent_CH - PRESENT CHILLER LOAD', min_value=0.0, step=0.01, label_visibility='collapsed')
    
    st.markdown('<div class="input-label">RT - PLANT TONE</div>', unsafe_allow_html=True)
    input4 = st.number_input('RT - PLANT TONE', min_value=0.0, step=0.01, label_visibility='collapsed')
    
    st.markdown('<div class="input-label">CHWS - CHILLED WATER SUPPLY TEMPERATURE</div>', unsafe_allow_html=True)
    input5 = st.number_input('CHWS - CHILLED WATER SUPPLY TEMPERATURE', min_value=0.0, step=0.01, label_visibility='collapsed')
    
    st.markdown('<div class="input-label">DeltaCHW - CHILLED WATER DELTA T(DIFFERENTIAL TEMPERATURE)</div>', unsafe_allow_html=True)
    input6 = st.number_input('DeltaCHW - CHILLED WATER DELTA T(DIFFERENTIAL TEMPERATURE)', min_value=0.0, step=0.01, label_visibility='collapsed')
    

    # When the user clicks "Predict"
    if st.button("Predict"):
        try:
            # Input array for prediction
            input_data = np.array([[input1, input2, input3, input4, input5, input6]])
            
            # Get the predictions from the model (2 outputs: Chiller Load and Plant Efficiency)
            predictions = model.predict(input_data)
            chiller_load = predictions[0][0]
            plant_efficiency = predictions[0][1]

            # Output section with solid background color
            st.success(f"Predicted Chiller Load: {chiller_load}")
            st.success(f"Predicted Plant Efficiency: {plant_efficiency * 100}%")

            # Calculate savings based on efficiency improvement
            efficiency_improvement = plant_efficiency - average_efficiency
            energy_saved_kwh = efficiency_improvement * chiller_load  # Example calculation, adjust to your model

            # Calculate saved money in INR
            amount_saved = energy_saved_kwh * energy_rate_per_kwh
            st.write(f"Amount Saved: ₹{amount_saved:.2f}")

            # Commission calculation
            commission = amount_saved * commission_rate
            st.write(f"Our Commission: ₹{commission:.2f} (5% of the savings)")

        except ValueError as e:
            st.error("Error: Please ensure the inputs are valid.")

# Navigation between pages
if 'page' not in st.session_state:
    st.session_state['page'] = 'landing_page'

if st.session_state['page'] == 'landing_page':
    landing_page()
elif st.session_state['page'] == 'prediction_page':
    prediction_page()
