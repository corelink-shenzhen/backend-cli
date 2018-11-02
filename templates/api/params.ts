/*
 * @Author: Yu Chen 
 * @Date: 2018-11-02 13:18:27 
 * @Last Modified by:   Yu Chen 
 * @Last Modified time: 2018-11-02 13:18:27 
 */

import { IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class <%=modelUppercase%>Params {
  @IsNumber()
  @ApiModelProperty()
  id: number;
}
