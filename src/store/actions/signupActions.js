import axios from "axios";
import { axiosWithAuth } from "../../utils";
import { dummyStrains } from "../../data";

export const SET_PREFS_START = "SET_PREFS_START";
export const SET_PREFS_SUCCESS = "SET_PREFS_SUCCESS";
export const SET_PREFS_FAILURE = "SET_PREFS_FAILURE";
export const setPrefs = (req) => (dispatch) => {
  const { id, prefs } = req;
  dispatch({ type: SET_PREFS_START });
  // setTimeout(() => {
  //   dispatch({
  //     type: SET_PREFS_SUCCESS,
  //     payload: [dummyStrains[0], dummyStrains[1], dummyStrains[2]],
  //   });
  // }, 3000);

  // Here, we update data in database
  return axios
    .post(
      `https://cors-anywhere.herokuapp.com/https://weed-data-bw.herokuapp.com/model`,
      prefs
    )
    .then((res) => {
      const name = res.data.map((x) => x.name);
      const req = { recommendations: name.join(", ") };

      axiosWithAuth()
        .put(`/api/user/${id}`, req)
        .then((res) => {
          console.log(res);
          dispatch({ type: SET_PREFS_SUCCESS, payload: req.recommendations });
        })
        .catch((err) => {
          console.log("error posting recs");
          dispatch({ type: SET_PREFS_FAILURE, payload: err });
        });
    })
    .catch((err) => {
      console.log("error getting model data");
    });
};

export const TOGGLE_FLAVOR = "TOGGLE_FLAVOR";
export const toggleFlavor = (e) => (dispatch) => {
  const { name } = e.target;
  dispatch({ type: TOGGLE_FLAVOR, payload: name });
};

export const TOGGLE_EFFECT = "TOGGLE_EFFECT";
export const toggleEffect = (e) => (dispatch) => {
  const { name } = e.target;
  dispatch({ type: TOGGLE_EFFECT, payload: name });
};

export const TOGGLE_LOCATION_PERMISSION = "TOGGLE_LOCATION_PERMISSION";
export const toggleLocationPermission = (e) => (dispatch) => {
  //Initialize to null
  let location = null;
  //If user allows location to be stored
  if (e.target.checked) {
    //Get location data here
    location = "test location";
  } //Otherwise location remains null
  //Store info in state
  dispatch({ type: TOGGLE_LOCATION_PERMISSION, payload: location });
};
