import React, { useEffect } from "react";
import Content from "../../layout/content/Content";
import { Card } from "reactstrap";
import Paper from "@mui/material/Paper";
import { Row, Col, FormGroup } from "reactstrap";
import { Button } from "../../components/Component";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Api from "../../http/api";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Mask_group from "../../images/Mask_group.png";
import coin_group from "../../images/coin_group.png";

export default function StarBucks() {
  const { data } = useQuery("starBucks", Api.getStarBucks);
  const mutation = useMutation(Api.manageStarBucks);
  const [starBucks, setStarBucks] = React.useState([]);
  const { errors, register, handleSubmit, reset } = useForm({
    reValidateMode: "onChange",
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      const { data: bucks } = data;
      const mainBucks = Object.values(bucks);
      if (mainBucks.length > 0) {
        setStarBucks(mainBucks);
      }
    }
  }, [data]);


  return (
    <Content>
   
        <div className="row">
		<Col sm={6} lg={6} xxl={6}>
		 <img src={Mask_group} alt={Mask_group} />
    
        </Col>
		<Col sm={6} lg={6} xxl={6}>
		 <a href="more_buy_starbucks"><img src={coin_group} alt={coin_group} /></a>
    
        </Col>
        </div>
    </Content>
  );
}
