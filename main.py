from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import pickle
import os
from fastapi.middleware.cors import CORSMiddleware

# Load the trained model
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model.pkl')
with open(MODEL_PATH, 'rb') as file:
    model = pickle.load(file)

# Constants
average_efficiency = 0.8
energy_rate_per_kwh = 6.0
commission_rate = 0.05

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows your frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class PredictionRequest(BaseModel):
    KW_TOT: float
    KW_CHH: float
    Precent_CH: float
    RT: float
    CHWS: float
    DeltaCHW: float

class PredictionResponse(BaseModel):
    chiller_load: float
    plant_efficiency: float
    amount_saved: float
    commission: float

@app.post('/predict', response_model=PredictionResponse)
def predict(request: PredictionRequest):
    try:
        input_data = np.array([[request.KW_TOT, request.KW_CHH, request.Precent_CH, request.RT, request.CHWS, request.DeltaCHW]])
        predictions = model.predict(input_data)
        chiller_load = float(predictions[0][0])
        plant_efficiency = float(predictions[0][1])
        efficiency_improvement = plant_efficiency - average_efficiency
        energy_saved_kwh = efficiency_improvement * chiller_load
        amount_saved = energy_saved_kwh * energy_rate_per_kwh
        commission = amount_saved * commission_rate
        return PredictionResponse(
            chiller_load=chiller_load,
            plant_efficiency=plant_efficiency,
            amount_saved=amount_saved,
            commission=commission
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e)) 