import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "../../src/services/recommendationsService.js";
import Factory from "../Factory/index.js";
import {jest} from "@jest/globals";

describe("RECOMENDATIONS SERVICE TESTS - INSERT FUNCTION",()=> {

    it("TEST INSERT FUNCTION, should throw error with duplicate data", async ()=>{

      const obj = Factory.Recomends.video();
      jest.spyOn(recommendationRepository, 'findByName').mockResolvedValueOnce(
            {
              id:1,
              name:obj.name,
              youtubeLink:obj.youtubeLink,
              score:12313
          });
      jest.spyOn(recommendationRepository,"create").mockResolvedValueOnce()
          
          try {

            await recommendationService.insert(obj)

          } catch(error) {
            expect(error.type).toEqual("conflict")
          }

        });
    it("TEST INSERT FUNCTION, should call create function when have no duplicate data", async ()=>{

          const obj = Factory.Recomends.video();
          jest.spyOn(recommendationRepository, 'findByName').mockResolvedValueOnce(null);
          jest.spyOn(recommendationRepository,"create").mockResolvedValueOnce();
    
          await recommendationService.insert(obj);

          expect(recommendationRepository.create).toHaveBeenCalled();
    
            });
      });



